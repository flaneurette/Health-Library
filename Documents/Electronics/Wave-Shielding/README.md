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
| Wi-Fi 5 GHz             | 5 GHz        | 5.8–6 cm                             | ≤ 0.6 cm                              
| Li-Fi (Visible Light)   | 430-750 THz  | 400-700 nm                           | ≤ 40-70 nm (practically solid surface) 
```

> Rule of thumb: hole size ≤ λ/10 for effective shielding, small is even better. Like: ≤ λ/20.

# Full table

> Wavelength (λ) is calculated from frequency (f) by λ = c / f (where c ≈ 3×10⁸ m/s).
 
> To block a frequency effectively, a Faraday shield or mesh should have holes significantly smaller than λ, typically ≲ λ/10.

> Always calculate the numbers yourself to be certain, typos may occur!

| Band | Frequency Range | Wavelength (λ) | Max Hole Size (λ/10) | Practical Mesh Example | Shielding Notes |
|------|----------------|----------------|---------------------|----------------------|----------------|
| ELF | 3 Hz – 30 Hz | 100,000 km – 10,000 km | impractical | N/A | Requires massive continuous metal, impossible at home |
| VLF | 3 kHz – 30 kHz | 100 km – 10 km | impractical | N/A | Huge grounded metal sheets needed |
| LF | 30 kHz – 300 kHz | 10 km – 1 km | impractical | N/A | Effectively impossible to shield at home |
| MF (AM radio) | 300 kHz – 3 MHz | 1 km – 100 m | ≲100 m | Large metal cage | Massive enclosure required |
| HF (Shortwave) | 3 MHz – 30 MHz | 100 m – 10 m | ≲10 m | Large metal mesh | Very large, not practical for home |
| VHF (FM radio) | 30 MHz – 300 MHz | 10 m – 1 m | ≲1 m | Chicken wire (~1–2 cm holes) | Large mesh or sheet attenuates FM well |
| UHF (TV / lower Wi-Fi / Cell) | 300 MHz – 3 GHz | 1 m – 0.1 m | ≲10 cm | Fine chicken wire or copper mesh | Good shielding if mesh small enough |
| SHF (Wi-Fi 2.4 GHz) | 2.4 GHz | 12.5 cm | 1.25 cm | Fine copper/aluminum mesh | Mesh must be ≲1.2 cm holes |
| SHF (Wi-Fi 5 GHz) | 5 GHz | 6 cm | 0.6 cm | Very fine mesh (~6 mm holes) | Chicken wire (~1 cm) only partially attenuates |
| EHF / mmWave (5G mmWave) | 30 GHz – 300 GHz | 1 cm – 1 mm | ≲1 mm | Specialized fine metal mesh | Very fine mesh or solid plating needed |
| Infrared (IR) | 300 GHz – 430 THz | 1 mm – 700 nm | ≲100 µm – 70 nm | Solid sheet or very fine foil | Depends on IR subband; mesh generally impractical |
| Visible Light (Li-Fi) | 430 THz – 750 THz | 700 nm – 400 nm | ≲40–70 nm | Solid opaque shield | Mesh ineffective; requires continuous surface |
| Ultraviolet (UV) | 750 THz – 30 PHz | 400 nm – 10 nm | ≲40 nm | Solid metal / film | Must be solid sheet or coating |
| X-Rays | 30 PHz – 30 EHz | 10 nm – 0.01 nm | ≲1 nm | Dense absorber (lead, concrete) | Faraday cage concept doesn’t apply |
| Gamma Rays | >30 EHz | <0.01 nm | ≲0.001 nm | Nuclear shielding | Only dense atomic nuclei materials work |

---

## 3. Practical mesh vs solid material

```
| Material                | Conductivity    | Pros                                        | Cons
|-------------------------|-----------------|---------------------------------------------|------------------------------------------------------
| Copper                  | Very high       | Excellent shielding, easy to solder/connect | Expensive 
| Aluminum                | High            | Cheap, lightweight                          | Softer, harder to maintain contact 
| Steel / Iron            | Moderate        | Strong, cheap                               | Lower conductivity, may rust 
| Silver                  | Extremely high  | Best conductivity                           | Very expensive 
| Mesh vs Solid           | -               | Mesh lighter, ventilated                    | Needs correct hole size; solid gives full shielding 
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
