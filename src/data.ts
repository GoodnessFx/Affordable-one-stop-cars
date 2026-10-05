export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1559038432-900891341900?auto=format&fit=crop&w=1800&q=86",
    alt: "White premium SUV parked beside contemporary architecture",
    eyebrow: "USA auction access, worldwide delivery",
  },
  {
    image: "https://images.unsplash.com/photo-1758025543739-2afbcf50873f?auto=format&fit=crop&w=1800&q=86",
    alt: "Grey premium SUV in a modern light-filled showroom",
    eyebrow: "Every detail handled, door to port",
  },
  {
    image: "https://images.unsplash.com/photo-1742800094846-e69da197114d?auto=format&fit=crop&w=1800&q=86",
    alt: "Dark luxury car outside a modern residence",
    eyebrow: "Buy with clarity. Ship with confidence.",
  },
];

const carImages = [
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1568844293986-8d0400f89d3a?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=82",
];

export const cars = [
  { year: 2021, name: "BMW X3 xDrive30i", price: "$22,500", mileage: "34,120 mi", damage: "Clean title", location: "Atlanta, GA", badge: "Hot offer", sale: "Buy now" },
  { year: 2018, name: "Audi Q7 Premium Plus", price: "$15,250", mileage: "68,440 mi", damage: "Minor dents", location: "Baltimore, MD", badge: "Live", sale: "Live auction" },
  { year: 2020, name: "Toyota RAV4 XLE", price: "$18,900", mileage: "51,890 mi", damage: "Clean title", location: "Houston, TX", badge: "New", sale: "Buy now" },
  { year: 2018, name: "Nissan Rogue Sport", price: "$9,650", mileage: "74,210 mi", damage: "Run & drive", location: "Newark, NJ", badge: "Sold", sale: "Buy now" },
  { year: 2019, name: "Lexus RX 350", price: "$24,800", mileage: "42,050 mi", damage: "Clean title", location: "Orlando, FL", badge: "Hot offer", sale: "Buy now" },
  { year: 2020, name: "Ford F-150 Lariat", price: "$27,950", mileage: "59,330 mi", damage: "Minor dents", location: "Dallas, TX", badge: "Live", sale: "Live auction" },
  { year: 2019, name: "Honda CR-V EX-L", price: "$17,400", mileage: "48,960 mi", damage: "Clean title", location: "Savannah, GA", badge: "New", sale: "Buy now" },
  { year: 2021, name: "Jeep Wrangler Sahara", price: "$31,200", mileage: "26,770 mi", damage: "Run & drive", location: "Los Angeles, CA", badge: "Hot offer", sale: "Live auction" },
].map((car, index) => ({ ...car, image: carImages[index] }));

export const categories = ["Clean Cars", "Salvage", "Live Auction", "Electric Vehicles", "Repo Sale", "SUVs & Trucks", "Order Parts"];

export const steps = [
  ["Get an Estimate", "Know the complete landed cost before you commit."],
  ["Choose a Car", "Shortlist auction or dealer vehicles with your agent."],
  ["Place a Deposit", "Secure your bidding power with a safe deposit."],
  ["Pay for Purchase", "Pay only after your bid or offer is confirmed."],
  ["We Ship", "We handle title work, trucking and ocean freight."],
  ["Receive at Port", "Track your car and collect it at your destination."],
];

export const benefits = [
  ["Gavel", "Real US auction access", "Bid at Copart, IAA and dealer-only wholesale channels."],
  ["ReceiptText", "Transparent landed cost", "See auction, transport and shipping costs before you buy."],
  ["ScanSearch", "Inspection reports", "Condition photos and independent inspections when available."],
  ["Ship", "End-to-end logistics", "Title paperwork, inland transport and ocean freight in one place."],
  ["MessageCircle", "A dedicated agent", "One knowledgeable contact, available on WhatsApp."],
];

export const ports = [
  ["Lagos", "Nigeria", "18–26 days", "NG"],
  ["Tema", "Ghana", "20–28 days", "GH"],
  ["Abidjan", "Côte d’Ivoire", "22–30 days", "CI"],
  ["Mombasa", "Kenya", "28–38 days", "KE"],
  ["Durban", "South Africa", "30–40 days", "ZA"],
  ["Jebel Ali", "UAE", "28–35 days", "AE"],
  ["Rotterdam", "Netherlands", "14–20 days", "NL"],
  ["Bremerhaven", "Germany", "15–22 days", "DE"],
  ["Santos", "Brazil", "22–32 days", "BR"],
  ["Kingston", "Jamaica", "10–16 days", "JM"],
];

export const brands = ["Toyota", "Honda", "Ford", "Mercedes-Benz", "Hyundai", "Nissan", "Lexus", "Chevrolet", "BMW", "Volkswagen", "Kia", "Mazda", "Dodge", "Jeep", "Land Rover", "Audi", "Tesla", "Porsche"];

export const reviews = [
  { name: "Ama Boateng", country: "Ghana", flag: "🇬🇭", date: "12 Sep 2025", quote: "My Lexus arrived in Tema exactly as described. Every fee was explained before I paid, and I received updates throughout the journey." },
  { name: "Carlos Mendoza", country: "Dominican Republic", flag: "🇩🇴", date: "28 Aug 2025", quote: "Un servicio claro y profesional. Me ayudaron a elegir, revisar y enviar el vehículo sin sorpresas. Los recomiendo totalmente." },
  { name: "Aïcha Koné", country: "Côte d’Ivoire", flag: "🇨🇮", date: "03 Aug 2025", quote: "Une équipe sérieuse et disponible. J’ai reçu les photos, les documents et le suivi du navire à chaque étape. Très rassurant." },
];

export const guides = [
  {
    title: "How to tell if a car sat for a long time",
    date: "October 2, 2025",
    text: "Auction photos reveal more than visible damage. Learn the details that suggest long-term storage.",
    image: "https://images.unsplash.com/photo-1619671650358-7bcc53c42f99?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Why bigger engines don’t always mean bigger fuel bills",
    date: "September 30, 2025",
    text: "Gearing, weight and driving style can matter more than engine size. Here is how to compare.",
    image: "https://images.unsplash.com/photo-1590362891689-6ecfb215fb73?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "What to check before you bid",
    date: "September 18, 2025",
    text: "A practical pre-bid checklist covering titles, keys, condition reports and transport costs.",
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=900&q=80",
  },
];

export const faqs = [
  ["How does buying from a US auction work?", "Tell us what you want and where it is going. We help you shortlist vehicles, review condition information, place the bid and handle the transaction and export."],
  ["What fees should I expect?", "Your estimate separates the vehicle price, auction fees, inland transport, ocean freight and a clearing allowance. Local duties vary by country and are confirmed separately."],
  ["How long does shipping take?", "Most ocean routes take 14 to 40 days after the vehicle reaches the departure port. Auction release and inland transport usually add 5 to 12 business days."],
  ["Can I buy salvage cars?", "Yes. We source clean-title, salvage, repossessed and run-and-drive vehicles. Your agent will explain the title and condition before you bid."],
  ["How do I pay?", "Payments are made by secure bank transfer to the company account shown on your invoice. We never ask clients to send vehicle payments to a personal account."],
  ["Do you handle customs paperwork?", "We prepare the US export documents and shipping paperwork. We can also connect you with a trusted clearing agent at many destination ports."],
  ["Can I inspect before shipping?", "Yes. Depending on the vehicle location, we can arrange an independent inspection, diagnostic scan and additional photo report for a separate fee."],
  ["What if the car is damaged in transit?", "We document vehicle condition before loading and offer marine insurance options. Any claim is managed using the carrier and insurance inspection records."],
];

export const countryOptions = ["Nigeria", "Ghana", "Côte d’Ivoire", "Kenya", "South Africa", "United Arab Emirates", "Germany", "Netherlands", "Brazil", "Jamaica"];
