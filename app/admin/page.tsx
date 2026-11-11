'use client'
import { FormEvent,useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

type Job={id:string;title:string;vehicle:string;service:string;before_path:string;after_path:string}

export default function Admin(){
 const supabase=createClient(),router=useRouter()
 const [ready,setReady]=useState(false),[jobs,setJobs]=useState<Job[]>([]),[message,setMessage]=useState(''),[busy,setBusy]=useState(false)
 async function load(){try{const {data,error}=await supabase.from('jobs').select('*').order('created_at',{ascending:false});if(error)throw error;setJobs((data||[]) as Job[])}catch{setMessage('Cannot load jobs right now. Please try again when the database is available.')}}
 useEffect(()=>{supabase.auth.getUser().then(({data})=>{if(!data.user)router.replace('/login');else{setReady(true);load()}})},[])
 async function upload(file:File,side:string){const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-');const path=`${crypto.randomUUID()}-${side}-${safe}`;const {error}=await supabase.storage.from('job-photos').upload(path,file);if(error)throw error;return path}
 async function publish(e:FormEvent<HTMLFormElement>){
   e.preventDefault();if(busy)return;setBusy(true);setMessage('Uploading photos...')
   const form=e.currentTarget,data=new FormData(form)
   try{
     const before=await upload(data.get('before') as File,'before')
     const after=await upload(data.get('after') as File,'after')
     const {error}=await supabase.from('jobs').insert({title:data.get('title'),vehicle:data.get('vehicle'),service:data.get('service'),description:data.get('description'),before_path:before,after_path:after})
     if(error)throw error
     form.reset();setMessage('Job published successfully.');load()
   }catch(error){const detail=error instanceof Error?error.message:'Unknown error';setMessage(detail.toLowerCase().includes('fetch')?'Cannot reach photo storage. Check your connection and try again later. Your form has not been cleared.':`Upload failed: ${detail}`)}finally{setBusy(false)}
 }
 async function remove(j:Job){
   if(!confirm('Delete this job and its photos?'))return
   await supabase.storage.from('job-photos').remove([j.before_path,j.after_path])
   await supabase.from('jobs').delete().eq('id',j.id);load()
 }
 if(!ready)return <main className="loading">Checking admin login...</main>
 return <main>
   <nav className="nav wrap"><a className="brand brandLogo" href="/"><img src="/Neon%20Blue%20Supercar%20Brand%20Logo.png" alt="Jebby Carz PTE LTD"/></a><div className="links"><a href="/gallery">View Gallery</a><button className="linkButton" onClick={async()=>{await supabase.auth.signOut();router.replace('/login')}}>Sign Out</button></div></nav>
   <section className="section wrap"><p className="eyebrow">JOB GALLERY</p><h1 className="sectionTitle">Upload completed work</h1>
   <form className="adminForm" onSubmit={publish}>
     <label>Job title<input name="title" required placeholder="Headlamp restoration"/></label>
     <label>Vehicle<input name="vehicle" required placeholder="BMW 5 Series"/></label>
     <label>Service<select name="service" required><option>Headlamp Repair</option><option>Headlamp Restoration</option><option>Lens Replacement</option><option>DRL Repair</option><option>Water Leakage Repair</option><option>Custom Lighting</option></select></label>
     <label className="wide">Description<textarea name="description" rows={3} placeholder="Optional job details"/></label>
     <label>Before photo<input name="before" type="file" accept="image/jpeg,image/png,image/webp" required/></label>
     <label>After photo<input name="after" type="file" accept="image/jpeg,image/png,image/webp" required/></label>
     <button className="button primary wide" type="submit" disabled={busy}>{busy?"Uploading...":"Upload & Publish"}</button>
   </form>{message&&<p className="status">{message}</p>}
   <p>For safety, keep copies of your original photos on your phone or another storage service. The CSV backup below contains job details and photo links, not the actual image files.</p><button type="button" className="button" onClick={()=>{const rows=[["Title","Vehicle","Service","Before photo URL","After photo URL"],...jobs.map(j=>[j.title,j.vehicle,j.service,supabase.storage.from("job-photos").getPublicUrl(j.before_path).data.publicUrl,supabase.storage.from("job-photos").getPublicUrl(j.after_path).data.publicUrl])];const csv=rows.map(row=>row.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(",")).join("\\r\\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="jebby-carz-job-backup.csv";link.click();URL.revokeObjectURL(link.href)}}>Download job list backup (CSV)</button>
   <div className="adminJobs">{jobs.map(j=><div key={j.id}><span><b>{j.title}</b><small>{j.vehicle} · {j.service}</small></span><button onClick={()=>remove(j)}>Delete</button></div>)}</div>
   </section>
 </main>
}
