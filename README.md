# 📊 Economía Comparada: España vs Andorra vs Estonia

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![D3.js](https://img.shields.io/badge/D3.js-DataViz-orange) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-purple)

Aplicación web interactiva que analiza y visualiza las diferencias fiscales, socioeconómicas y demográficas entre tres modelos europeos radicalmente distintos. Actualizada con datos de **2026** y proyecciones a largo plazo.

## ✨ Características Principales

### 💰 Simulador de Riqueza (Gamificación)
Calcula la diferencia patrimonial a 20 años invirtiendo el ahorro fiscal.
- **Interés Compuesto**: Proyecciones basadas en un retorno anual del 5% (S&P 500 conservador).
- **Comparativa Directa**: Visualiza cuánto más rico serías en cada país con el mismo coste laboral.
- **Gráficos D3.js**: Visualización interactiva y animada del crecimiento exponencial.

### 🔮 Proyecciones Demográficas (2024-2075)
Análisis profundo del impacto del "Invierno Demográfico".
- **Tendencias**: Evolución de la población indexada (Base 100 = 2026).
- **Deuda Pública**: Correlación cualitativa entre envejecimiento y carga de deuda.
- **Fuentes**: Naciones Unidas (World Population Prospects) y Eurostat.

### 🏝️ UI/UX "Dynamic Island"
Diseño moderno y fluido enfocado en la experiencia de usuario.
- **Navegación Flotante**: Menú tipo "Dynamic Island" con glassmorphism o efecto cristal.
- **Active Highlight**: Detección de sección activa en tiempo real con efectos de brillo neón.
- **Tipografía**: Fuente **Inter** optimizada para máxima legibilidad y estética premium.

### 📚 Trazabilidad y Datos (Dual Currency)
Rigor científico en cada dato mostrado.
- **Divisa Dual**: Todos los valores monetarios en **EUR (€)** y **USD ($)**.
- **Fuentes Explícitas**: Cada tarjeta KPI cita su fuente (Banco Mundial, FMI, AEAT, etc.).
- **Datos 2026**: Referencias actualizadas al último ejercicio fiscal disponible/proyectado.

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: Vanilla CSS Modules (Variables CSS, Glassmorphism, Mesh Gradients)
- **Visualización**: [D3.js](https://d3js.org/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/tax-comparison-web.git
    cd tax-comparison-web
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4.  **Construir para producción**:
    ```bash
    npm run build
    npm start
    ```

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── layout.tsx       # Metadata y fuentes globales
│   ├── page.tsx         # Página principal (Dashboard)
│   └── globals.css      # Variables CSS, diseño global, temas
├── components/          # Componentes modulares
│   ├── Navigation.tsx   # Menú "Dynamic Island"
│   ├── TaxCalculator.tsx # Calculadora + Simulador Riqueza
│   ├── LongTermProjection.tsx # Gráficos D3 2075
│   └── ...              # Charts (Debt, Spending, etc.)
├── data/
│   └── countries.ts     # Fuente única de verdad (Datos + Fuentes)
└── utils/
    └── formatters.ts    # Formateadores (Moneda Dual, Porcentajes)
```

## ⚠️ Disclaimer

Este proyecto es una herramienta educativa y de visualización. Aunque se basa en fuentes oficiales y datos reales actualizados a Enero de 2026, las situaciones fiscales individuales pueden variar. No constituye asesoramiento financiero profesional.

---

Desarrollado con ❤️ para visualizar la libertad económica.
