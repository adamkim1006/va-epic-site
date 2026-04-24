import { NextResponse } from "next/server"

import { getRequestOrigin } from "@/lib/decap"

export const runtime = "nodejs"

function renderPopupPage(message: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Authorizing Decap CMS</title>
  </head>
  <body>
    <p>Authorizing Decap CMS...</p>
    <script>
      (function () {
        const message = ${JSON.stringify(message)};

        function sendResult(targetOrigin) {
          if (!window.opener) {
            return;
          }

          window.opener.postMessage(message, targetOrigin);
          window.setTimeout(function () {
            window.close();
          }, 150);
        }

        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");

          window.addEventListener(
            "message",
            function receiveMessage(event) {
              window.removeEventListener("message", receiveMessage, false);
              sendResult(event.origin);
            },
            false
          );

          window.setTimeout(function () {
            sendResult("*");
          }, 1200);
        }
      })();
    </script>
  </body>
</html>`
}

function renderErrorMessage(message: string) {
  return renderPopupPage(
    `authorization:github:error:${JSON.stringify({ error: message })}`
  )
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const returnedState = requestUrl.searchParams.get("state")
  const storedState = request.headers
    .get("cookie")
    ?.match(/(?:^|; )decap-oauth-state=([^;]+)/)?.[1]
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET

  if (!code || !returnedState || !storedState || returnedState !== storedState) {
    return new NextResponse(renderErrorMessage("Invalid or expired OAuth state."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }

  if (!clientId || !clientSecret) {
    return new NextResponse(
      renderErrorMessage(
        "Missing GitHub OAuth credentials. Add GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET."
      ),
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    )
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: new URL("/api/decap/callback", getRequestOrigin(request)).toString(),
      state: returnedState,
    }),
  })

  const tokenPayload = (await tokenResponse.json()) as {
    access_token?: string
    error?: string
    error_description?: string
    scope?: string
    token_type?: string
  }

  if (!tokenResponse.ok || !tokenPayload.access_token) {
    const message =
      tokenPayload.error_description ||
      tokenPayload.error ||
      "GitHub did not return an access token."

    return new NextResponse(renderErrorMessage(message), {
      status: 502,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  }

  const successMessage = `authorization:github:success:${JSON.stringify({
    token: tokenPayload.access_token,
    provider: "github",
  })}`

  const response = new NextResponse(renderPopupPage(successMessage), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })

  response.cookies.set("decap-oauth-state", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(0),
  })

  return response
}
