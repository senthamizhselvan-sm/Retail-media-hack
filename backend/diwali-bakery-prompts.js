// Enhanced prompts for Diwali bakery brochure generation

const diwaliBakeryPrompts = {
  
  // Main brochure design
  brochureDesign: `Professional Diwali festival marketing brochure for bakery business. 
  
  VISUAL DESIGN:
  - Elegant Diwali theme with golden diyas (oil lamps) and warm lighting
  - Traditional rangoli patterns as decorative borders
  - Rich golden, orange, and deep red color palette
  - Marigold flowers and traditional Indian motifs
  - Professional typography with space for business text
  
  LAYOUT ELEMENTS:
  - Header area for bakery name and "Happy Diwali" greeting
  - Central product showcase section
  - Traditional Indian sweet displays (laddu, barfi, gulab jamun)
  - Festive cake and pastry arrangements
  - Contact information footer area
  - Gift box promotional section
  
  STYLE: Professional brochure design, print-ready quality, modern marketing appeal with traditional festival aesthetics`,

  // Product showcase version
  productShowcase: `Diwali bakery product catalog design featuring traditional Indian sweets and modern bakery items.
  
  PRODUCTS TO HIGHLIGHT:
  - Traditional mithai (Indian sweets): laddu, barfi, rasgulla, gulab jamun
  - Festive decorated cakes with Diwali themes
  - Special occasion pastries and cookies
  - Diwali gift boxes and hampers
  - Custom celebration cakes
  
  DESIGN ELEMENTS:
  - Beautiful product photography style layout
  - Traditional Diwali decorations (diyas, rangoli, flowers)
  - Warm festival lighting and golden accents
  - Professional bakery presentation
  - Price list and special offer sections
  
  STYLE: High-quality product catalog, professional food photography aesthetic, festival marketing design`,

  // Simple banner version
  festivalBanner: `Diwali bakery promotional banner design.
  
  CONTENT:
  - "Happy Diwali" greeting message
  - "Special Festival Sweets & Cakes Available"
  - Traditional diya lamps and rangoli decorations
  - Warm golden and orange festival colors
  - Space for bakery name and contact details
  
  STYLE: Clean banner design, festival theme, professional bakery marketing`
};

// Test function to generate different versions
async function generateDiwaliBrochures() {
  const axios = require('axios');
  
  console.log('🪔 Generating multiple Diwali bakery designs...\n');
  
  for (const [type, prompt] of Object.entries(diwaliBakeryPrompts)) {
    try {
      console.log(`📋 Creating ${type}...`);
      
      const response = await axios.post('http://localhost:5000/api/ai/generate', {
        prompt: prompt,
        style: 'professional',
        size: '1024x1024',
        count: 1
      });
      
      console.log(`✅ ${type} generated: ${response.data.images[0]}\n`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${type}:`, error.message);
    }
  }
}

// Run the generation
generateDiwaliBrochures();