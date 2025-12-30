# Electromagnetic wave shielding

This guide explains how to block different types of radio and light waves using Faraday cages, meshes, and conductive materials.

---

## 1. How faraday shielding works

- Faraday cage: conductive enclosure that cancels incoming EM fields inside
- Mechanism: Electrons in the metal move to cancel the external electric field
- Key factors:
  - Wavelength of the signal
  - Continuity of the conductive surface
  - Mesh size relative to wavelength
  - Conductivity of material

---

## 2. Wavelengths and required mesh sizes

```
| Signal Type             | Frequency    | Wavelength (λ)                       | Recommended Maximum Hole Size (≈λ/10)
|-------------------------|--------------|--------------------------------------|--------------------------------------
| FM Radio                | 88-108 MHz   | 3.0-2.78 m                           | ≤ 30 cm                               
| Wi-Fi 2.4 GHz           | 2.4 GHz      | 0.125 m                              | ≤ 1.25 cm                             
| Wi-Fi 5 GHz             | 5 GHz        | 0.06 m                               | ≤ 0.6 cm                              
| Li-Fi (Visible Light)   | 430-750 THz  | 400-700 nm                           | ≤ 40-70 nm (practically solid surface) 
| Infrared                | 300-430 THz  | 700 nm - 1 µm                        | ≤ 70 nm-100 µm (solid surface needed)  
```

> Rule of thumb: hole size ≤ λ/10 for effective shielding, small is even better. Like: ≤ λ/20.

# Full table

> Wavelength (λ) is calculated from frequency (f) by λ = c / f (where c ≈ 3×10⁸ m/s).  
> To block a frequency effectively, a Faraday shield or mesh should have holes significantly smaller than λ, typically ≲ λ/10.

| *Band* | *Freq range* | *Approx λ range* | *Recommended max hole size (≈λ/10)* | *Shielding notes* |
|---|---|---|---|---|
| ELF (extremely low freq) | 3 Hz - 30 Hz | ~100,000 km - 10,000 km | impractical | requires solid metal shielding; field effects dominate at low f
| VLF (very low freq) | 3 kHz - 30 kHz | ~100 km - 10 km | impractical | needs large continuous grounded metal sheets
| LF (low freq / long wave) | 30 kHz - 300 kHz | ~10 km - 1 km | impractical | effectively impossible to block at home
| MF (medium freq / AM radio) | 300 kHz - 3 MHz | ~1 km - 100 m | ≲100 m | massive enclosure or building‑wide shield
| HF (shortwave) | 3 MHz - 30 MHz | ~100 m - 10 m | ≲10 m | still very large; not practically meshable
| VHF (FM radio) | 30 MHz - 300 MHz | ~10 m - 1 m | ≲1 m | large mesh or sheet would be needed 
| UHF (TV / cell / Wi‑Fi lower) | 300 MHz - 3 GHz | ~1 m - 10 cm | ≲10 cm | common wireless like Bluetooth, some LTE 
| SHF (Wi‑Fi / Wi‑Fi5 GHz) | 3 GHz - 30 GHz | ~10 cm - 1 cm | ≲1 cm | typical fine mesh or solid sheet blocks these well
| EHF / mmWave (5G mmWave) | 30 GHz - 300 GHz | ~1 cm - 1 mm | ≲1 mm | requires *very fine mesh* or solid plating
| Infrared (IR) | ~300 GHz - 430 THz | ~1 mm - 700 nm | ≲100 nm | practically solid metal; mesh holes must be *much smaller*
| Visible light | ~430 THz - 750 THz | ~700 nm - 400 nm | ≲40 nm | far too fine for mesh; requires continuous opaque surface 
| Ultraviolet (UV) | ~750 THz - 30 PHz | ~400 nm - 10 nm | ≲40 nm | metal film or solid shielding
| X‑rays | ~30 PHz - 30 EHz | ~10 nm - 0.01 nm | ≲1 nm | Faraday cage concept doesn’t apply; need dense absorber (e.g., lead)
| Gamma rays | >~30 EHz | <0.01 nm | ≲0.001 nm | require nuclear shielding, not simple mesh

---

## 3. Practical mesh vs solid material

```
| Material                | Conductivity    | Pros                                        | Cons
|-------------------------|-----------------|---------------------------------------------|------------------------------------------------------
| Copper                  | Very high       | Excellent shielding, easy to solder/connect | Expensive 
| Aluminum                | High            | Cheap, lightweight                          | Softer, harder to maintain contact 
| Steel / Iron            | Moderate        | Strong, cheap                               | Lower conductivity, may rust 
| Silver                  | Extremely high  | Best conductivity                           | Very expensive 
| Mesh vs Solid           | —               | Mesh lighter, ventilated                    | Needs correct hole size; solid gives full shielding 
```

---

## 4. Design Considerations

1. Electrical continuity
   - Strips of metal must be electrically bonded
   - Avoid gaps larger than the recommended λ/10

2. Mesh size
   - FM: λ ≈ 3 m → max hole ≤ 30 cm
   - Wi-Fi 2.4 GHz: λ ≈ 12.5 cm → max hole ≤ 1.25 cm
   - Wi-Fi 5 GHz: λ ≈ 6 cm → max hole ≤ 0.6 cm

3. Material thickness
   - For low frequencies (FM, VHF): 0.5-1 mm metal is enough
   - For higher frequencies: thinner meshes can work if hole size is correct

4. Practical tips
   - Small gaps, loose strips, or unconnected mesh drastically reduce shielding
   - Solid sheet gives the best protection, mesh is lighter and easier to handle
   - Shielded rooms often combine metal mesh + solid conductors

---

## 5. Examples

- FM Radio Cage
  - Mesh: copper or aluminum
  - Hole size ≤ 30 cm
  - Strips electrically bonded at edges
- Wi-Fi Cage
  - Mesh: copper/aluminum
  - Hole size ≤ 1 cm (2.4 GHz), ≤ 0.6 cm (5 GHz)
  - Requires careful connections to avoid leakage
- Li-Fi / Infrared
  - Essentially requires solid surface, as visible and IR light wavelengths are tiny

---

## 6. Summary

- Lower frequency → larger wavelength → easier to shield
- Higher frequency → smaller wavelength → finer mesh needed
- Good materials: copper > aluminum > steel (conductivity and corrosion resistant)
- Mesh rule: holes ≤ λ/10
- Continuity matters: all metal pieces must touch for shielding to work
