'use server'

import { google } from "googleapis"

const subscribeToNewsletter = async (firstName: string, email: string) => {
  try {
    if (!firstName || !email) {
      return { success: false, error: "First name and email are required" }
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID is not configured")
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "subs!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[firstName, email]],
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe. Please try again.",
    }
  }
}

export default subscribeToNewsletter
