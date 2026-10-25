# PhotoCraft — Friday Works modified build

Based on PhotoCraft v0.15.1 by the ArtCraft team (MIT OR Apache-2.0). This is not an official release and is not endorsed by the upstream team.

The included patch changes hosted-font startup: Be Vietnam Pro is fetched with manifest SRI and registered before imports are interactive. Requests abort after ten seconds; failure leaves a usable editor and a warning. The PSD font choice is preserved; only Regular is supplied and the font is not embedded in saved PSDs.

See BUILDINFO.json, the source patch, NOTICE, ATTRIBUTION.md and licenses/. The upstream small boot loader is unchanged. The PhotoCraft app icon has its own MIT/Apache licence. Be Vietnam Pro retains its SIL OFL 1.1 licence in fonts/be-vietnam-pro/OFL.txt.
