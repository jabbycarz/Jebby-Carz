'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'

type Job = { id:string; title:string; vehicle:string; service:string; description:string|null; before_path:string; after_path:string }

export default function Gallery() {
  const [jobs,setJobs] = useState<Job[]>([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const supabase = createClient()
  useEffect(() => {
    supabase.from('jobs').select('*').order('created_at',{ascending:false}).then(({data,error}) => {if(error)setError('Gallery temporarily unavailable. Please try again shortly. Your photos have not necessarily been deleted.');else setJobs((data || []) as Job[]);setLoading(false)}).catch(()=>{setError('Cannot connect to the gallery right now. Please refresh later.');setLoading(false)})
  }, [])
  const url=(p:string)=>supabase.storage.from('job-photos').getPublicUrl(p).data.publicUrl
  return <main>
    <nav className="nav wrap galleryNav"><a className="brand brandLogo" href="/"><img src="/Neon%20Blue%20Supercar%20Brand%20Logo.png" alt="Jebby Carz PTE LTD"/></a><div className="links"><a href="/">Home</a><a className="pill" href="https://wa.me/6597974631">WhatsApp</a></div></nav>
    <section className="section wrap galleryPage"><p className="eyebrow">OUR WORK</p><h1 className="sectionTitle">Before &amp; After Gallery</h1><p className="lead">Real headlamp jobs completed by Jebby Carz.</p>
      {loading ? <div className="empty">Loading completed jobs...</div> : error ? <div className="empty" role="alert">{error} <button type="button" onClick={()=>window.location.reload()}>Retry</button></div> : jobs.length===0 ? <div className="empty">Our completed job photos will appear here soon.</div> :
      <div className="gallery">{jobs.map(j=><article className="job" key={j.id}>
        <div className="compare"><figure><img src={url(j.before_path)} alt={j.title+' before'}/><figcaption>BEFORE</figcaption></figure><figure><img src={url(j.after_path)} alt={j.title+' after'}/><figcaption>AFTER</figcaption></figure></div>
        <div className="jobBody"><span>{j.service}</span><h2>{j.title}</h2><b>{j.vehicle}</b>{j.description && <p>{j.description}</p>}</div>
      </article>)}</div>}
    </section>
  </main>
}
