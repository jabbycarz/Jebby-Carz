const whatsapp = 'https://wa.me/6597974631'
const maps = 'https://maps.app.goo.gl/M3yGAjoRvhxwWZm77'
const services = [
 ['Headlamp Repair','Diagnosis and repair for faulty automotive headlamps.'],
 ['Headlamp Restoration','Restore cloudy, yellowed and aged headlamp lenses.'],
 ['Lens Replacement','Replacement solutions for damaged headlamp lenses.'],
 ['DRL Repair','Repair for daytime running light faults and failures.'],
 ['Water Leakage Repair','Find and repair headlamp moisture and water ingress.'],
 ['Custom Lighting','Discuss custom automotive lighting solutions with us.'],
]
export default function Home(){return <main>
<nav className="nav wrap"><a className="brand brandLogo" href="#top"><img src="/Neon%20Blue%20Supercar%20Brand%20Logo.png" alt="Jebby Carz PTE LTD"/></a><div className="links"><a href="#services">Services</a><a href="/gallery">Gallery</a><a href="#contact">Contact</a><a className="pill" href={whatsapp}>WhatsApp</a></div></nav>
<section id="top" className="hero"><div className="wrap heroGrid"><div><p className="eyebrow">HEADLAMP SPECIALIST • SINGAPORE</p><h1>Bring your headlights <em>back to life.</em></h1><p className="lead">Professional headlamp repair, restoration, lens replacement, DRL repair and water-leak solutions. Repair before replacement whenever possible.</p><div className="actions"><a className="button primary" href={whatsapp}>WhatsApp Us</a><a className="button" href="/gallery">View Our Work</a></div></div><div className="heroCard logoCard"><img className="heroLogo" src="/Neon%20Jebby%20Carz%20Racing%20Logo.png" alt="Jebby Carz"/></div></div></section>
<section id="services" className="section wrap"><p className="eyebrow">WHAT WE DO</p><h2 className="sectionTitle">Headlamp services</h2><div className="cards">{services.map(([name,desc])=><article className="card" key={name}><h3>{name}</h3><p>{desc}</p><a href={whatsapp}>Enquire →</a></article>)}</div></section>
<section className="repair"><div className="wrap repairGrid"><div><p className="eyebrow">OUR APPROACH</p><h2>Repair before replacement.</h2><p>Headlamp assemblies can be expensive. We inspect the problem and discuss a suitable repair solution before recommending replacement.</p></div><div className="steps"><div><b>01</b><span>Send us your vehicle details and photos</span></div><div><b>02</b><span>We assess the headlamp issue</span></div><div><b>03</b><span>Arrange your repair with Jebby Carz</span></div></div></div></section>
<section id="contact" className="section wrap contact"><p className="eyebrow">GET IN TOUCH</p><h2 className="sectionTitle">Need your headlamps fixed?</h2><p>Tell us your vehicle make/model and what is wrong. Photos are helpful.</p><div className="actions center"><a className="button primary" href={whatsapp}>WhatsApp +65 9797 4631</a><a className="button" href={maps}>Workshop Location</a></div><p className="address">55 Serangoon North Ave 4, #03-01R, Singapore 555859</p></section>
<footer><div className="wrap">© {new Date().getFullYear()} Jebby Carz Pte Ltd <span>Headlamp specialists in Singapore</span></div></footer>
</main>}
