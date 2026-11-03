import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { urlFor } from "./sanity"
import { site } from "./site"

export const ogSize = { width: 1200, height: 630 }

const colors = {
  ink: "#0A2540",
  sky: "#3AA8E0",
  spectrum: ["#3A9FD8", "#D9473F", "#EFA93A", "#6BB53F", "#57B8B5"],
}

const assetDir = join(process.cwd(), "assets/og")

type OgFonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]>

let assets: Promise<{ fonts: OgFonts; logo: string }> | undefined

function loadAssets() {
  assets ??= Promise.all([
    readFile(join(assetDir, "SourceSerif4-SemiBold.ttf")),
    readFile(join(assetDir, "SourceSans3-Regular.ttf")),
    readFile(join(assetDir, "SourceSans3-SemiBold.ttf")),
    readFile(join(assetDir, "logo.png")),
  ]).then(([serif, sans, sansBold, logo]) => ({
    fonts: [
      { name: "Source Serif 4", data: serif, weight: 600 as const, style: "normal" as const },
      { name: "Source Sans 3", data: sans, weight: 400 as const, style: "normal" as const },
      { name: "Source Sans 3", data: sansBold, weight: 600 as const, style: "normal" as const },
    ],
    logo: `data:image/png;base64,${logo.toString("base64")}`,
  }))
  return assets
}

// Same five-dot signature as components/spectrum-mark.tsx, drawn with Satori-safe styles
function SpectrumMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {colors.spectrum.map((c) => (
        <div key={c} style={{ width: 12, height: 12, borderRadius: 999, background: c }} />
      ))}
    </div>
  )
}

export interface OgInput {
  /** Small label above the title, e.g. "News · Community" */
  eyebrow?: string
  title: string
  /** Line under the title, e.g. date and author */
  meta?: string
  /** Sanity image shown beside the text */
  image?: any
  /** Sanity image chosen by an editor to replace the generated card entirely */
  override?: any
}

function titleSize(title: string, withImage: boolean) {
  const len = title.length
  if (withImage) return len > 90 ? 42 : len > 60 ? 50 : 58
  return len > 110 ? 50 : len > 70 ? 60 : 70
}

export async function renderOgImage({ eyebrow, title, meta, image, override }: OgInput) {
  const { fonts, logo } = await loadAssets()

  if (override?.asset) {
    const src = urlFor(override).width(ogSize.width).height(ogSize.height).fit("crop").format("jpg").quality(85).url()
    return new ImageResponse(
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={ogSize.width} height={ogSize.height} alt="" style={{ objectFit: "cover" }} />,
      { ...ogSize, fonts },
    )
  }

  const imageSrc = image?.asset
    ? urlFor(image).width(460).height(630).fit("crop").format("jpg").quality(80).url()
    : null

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: colors.ink, fontFamily: "Source Sans 3" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={64} height={64} alt="" style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Source Serif 4", fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>{site.shortName}</span>
              <span style={{ fontSize: 19, color: "rgba(255,255,255,0.65)" }}>{site.name}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 20 }}>
            {eyebrow && (
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <SpectrumMark />
                <span style={{ fontSize: 21, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: colors.sky }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <span
              style={{
                fontFamily: "Source Serif 4",
                fontSize: titleSize(title, Boolean(imageSrc)),
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: -0.5,
                lineClamp: 4,
              }}
            >
              {title}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, fontSize: 22 }}>
            <span style={{ flex: 1, minWidth: 0, color: "rgba(255,255,255,0.72)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {meta ?? ""}
            </span>
            <span style={{ fontWeight: 600, flexShrink: 0 }}>scdan.org</span>
          </div>
        </div>

        {imageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} width={460} height={630} alt="" style={{ objectFit: "cover" }} />
        )}
      </div>
    ),
    { ...ogSize, fonts },
  )
}
