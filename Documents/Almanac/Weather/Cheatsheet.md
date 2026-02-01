# Weather Cheat Sheet

A complete reference for temperature, UV, rain, storms, and lightning with formulas.

---

## Air Density

```
Useful for convection, buoyancy, storms
ρ = P / (R * T)
ρ = air density [kg/m³]
P = pressure [Pa]
T = temperature [K]
R ≈ 287 J/(kg·K)
```

---

## Air pressure (predict rain or snow)

```
P_change = current_pressure - previous_pressure [hPa]

If P_change < -3 hPa in last 6 hours:
    Rain/Snow probability ~ 70–90%
Else if P_change between -1 and -3 hPa:
    Probability ~ 30–50%
Else:
    Probability low
```

- Falling pressure = wet weather coming

- Rising pressure = dry weather coming

- Fast changes = stronger precipitation

- Combine with temperature and humidity to distinguish rain vs snow


## Dew Point & Humidity
Predict fog, clouds, condensation

### Saturation vapor pressure (Tetens)
e_s(T) = 6.112 * exp(17.67*T / (T + 243.5)) [hPa]

### Actual vapor pressure
e = (RH / 100) * e_s(T)

### Dew point
T_d = 243.5 * ln(e/6.112) / (17.67 - ln(e/6.112))

T = °C, RH = %

---

### Wind Chill (cold)

```
T_wc = 13.12 + 0.6215*T - 11.37*v^0.16 + 0.3965*T*v^0.16
T = air temp [°C], v = wind speed [km/h]
```

---

### Heat Index (hot & humid)

```
HI = -8.7847 + 1.6114*T + 2.3385*RH - 0.1461*T*RH 
     - 0.0123*T^2 - 0.0164*RH^2 + 0.0022*T^2*RH 
     + 0.000725*T*RH^2 - 0.000003582*T^2*RH^2
T = °C, RH = %
```

---

### Pressure vs Altitude

```
h = (T0 / L) * [1 - (P/P0)^(R*L/g)]
h = altitude [m], P = pressure at h, P0 = sea level pressure
T0 = temp at sea level [K], L = lapse rate ≈ 0.0065 K/m
R = 287 J/kg·K, g = 9.81 m/s²
```

---

### Convection & Storm Potential (CAPE)

```
CAPE = ∫ (LFC to EL) g * (T_parcel - T_env) / T_env dz
T_parcel = rising air temperature
T_env = environmental temperature
LFC = level of free convection
EL = equilibrium level
g = 9.81 m/s²
```

---

### Rain / Cloud Formation (simplified)

```
If RH ≥ 100% -> condensation -> clouds
Lifting + cooling air -> precipitation potential
Combine with CAPE & wind shear -> thunderstorm likelihood
```

---

### Weather Parameters

```
          Temp          Wind           Rain            Lightning
High    ┤ █████         ████           ██████          ████
Medium  ┤ ███            ██            ███             ██
Low     ┤ █              -             █               -

Legend:
█ = High / Significant
- = Low / Minimal
```

---

### Seasonal Weather Map

Months: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec

### Temperature (°C)

```
High     ┤                           ██████ ██████
Moderate ┤             █████ █████
Low      ┤ ███ ███ █ █

High = Avg High, Low = Avg Low
```

---

### UV Level (Relative)

```
High     ┤       ████████████ Jul  (10–16:00)
Moderate ┤     ███████ Apr/May/Sep
Low      ┤ ██ Jan/Feb/Dec
```

---

### Rain (mm)

```
High     ┤               ████ Oct/Nov ~90–95mm
Moderate ┤        ████ Jan/May ~70mm
Low      ┤  ███ Apr/Feb ~50–60mm
```

---

### Storms & Lightning (days)

```
Storms    ┤          ████ Jun/Jul ~6 days
Lightning ┤       ██ Jul ~5–6 days
Low       ┤ █ Jan/Feb/Dec ~3 storms / 0–1 lightning
```

---

