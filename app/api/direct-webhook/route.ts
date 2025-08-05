import { NextResponse } from "next/server"

// Define the correct webhook URL
const CORRECT_WEBHOOK_URL = "https://n8n.automatedsolarbiz.com/webhook/0ed3686d-9ac5-49d3-bea9-b9887021f3a4"

export async function POST(request: Request) {
  console.log("=== DIRECT WEBHOOK API ROUTE CALLED ===")

  try {
    // Parse the incoming request body
    const data = await request.json()
    console.log("Received data for direct webhook:", data)
    console.log("Using webhook URL:", CORRECT_WEBHOOK_URL)

    // Send directly to n8n webhook
    const response = await fetch(CORRECT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "NextJS-Direct-Webhook",
        "X-Source": "direct-webhook-api-route",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const responseText = await response.text()

    console.log("n8n webhook response status:", response.status)
    console.log("n8n webhook response:", responseText)

    return NextResponse.json({
      success: true,
      message: "Data sent directly to webhook successfully",
      status: response.status,
      response: responseText,
      webhookUrl: CORRECT_WEBHOOK_URL,
    })
  } catch (error) {
    console.error("Error in direct webhook:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send data directly to webhook",
        error: error instanceof Error ? error.message : String(error),
        webhookUrl: CORRECT_WEBHOOK_URL,
      },
      { status: 500 },
    )
  }
}
