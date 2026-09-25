"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, Check, ChevronDown, FileText, Hash, LogOut, Menu, Moon, Plus, Search, Settings, Star, Sun, Trash2, X } from "lucide-react";

type Note = { id:string; title:string; content:string; updated:number; pinned:boolean; archived:boolean; tags:string[] };

const seed: Note[] = [
  { id:"welcome", title:"Welcome to Notsy", content:"A calm place for your ideas. Create a note, pin important thoughts, and use search to find anything quickly.", updated:Date.now(), pinned:true, archived:false, tags:["welcome"] },
  { id:"ideas", title:"Project ideas", content:"• Build something useful\n• Keep the interface simple\n• Ship small improvements often", updated:Date.now()-3600000, pinned:false, archived:false, tags:["ideas"] }
];

export default function Home() {
  const [notes,setNotes]=useState<Note[]>([]);
  const [selected,setSelected]=useState<string|null>(null);
  const [query,setQuery]=useState("");
  const [view,setView]=useState<"all"|"pinned"|"archive">("all");
  const [dark,setDark]=useState(true);
  const [mobileOpen,setMobileOpen]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem("notsy-notes");
    setNotes(saved?JSON.parse(saved):seed);
    setDark(localStorage.getItem("notsy-theme")!=="light");
  },[]);
  useEffect(()=>{ if(notes.length) localStorage.setItem("notsy-notes",JSON.stringify(notes)); },[notes]);
  useEffect(()=>{ document.documentElement.dataset.theme=dark?"dark":"light"; localStorage.setItem("notsy-theme",dark?"dark":"light"); },[dark]);

  const filtered=useMemo(()=>notes.filter(n=>{
    const inView=view==="all"?!n.archived:view==="pinned"?n.pinned&&!n.archived:n.archived;
    const q=query.toLowerCase();
    return inView && (!q || n.title.toLowerCase().includes(q)||n.content.toLowerCase().includes(q)||n.tags.some(t=>t.includes(q)));
  }).sort((a,b)=>Number(b.pinned)-Number(a.pinned)||b.updated-a.updated),[notes,query,view]);

  const current=notes.find(n=>n.id===selected)||filtered[0]||null;
  useEffect(()=>{ if(!selected&&filtered[0]) setSelected(filtered[0].id); },[filtered,selected]);

  function createNote(){
    const n:Note={id:crypto.randomUUID(),title:"Untitled note",content:"",updated:Date.now(),pinned:false,archived:false,tags:[]};
    setNotes(x=>[n,...x]); setSelected(n.id);
  }
  function update(p:Partial<Note>){ if(!current)return; setNotes(x=>x.map(n=>n.id===current.id?{...n,...p,updated:Date.now()}:n)); }
  function remove(){ if(!current)return; setNotes(x=>x.filter(n=>n.id!==current.id)); setSelected(null); }

  return <main className="shell">
    <aside className={mobileOpen?"sidebar open":"sidebar"}>
      <div className="brand"><div className="logo">N</div><span>Notsy</span><button className="mobile-close" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
      <button className="new-note" onClick={createNote}><Plus size={18}/> New note <span>⌘ N</span></button>
      <div className="nav">
        <button className={view==="all"?"active":""} onClick={()=>setView("all")}><FileText size={18}/> All notes <b>{notes.filter(n=>!n.archived).length}</b></button>
        <button className={view==="pinned"?"active":""} onClick={()=>setView("pinned")}><Star size={18}/> Pinned</button>
        <button className={view==="archive"?"active":""} onClick={()=>setView("archive")}><Archive size={18}/> Archive</button>
      </div>
      <div className="sidebar-bottom">
        <button><Settings size={18}/> Settings</button>
        <button><LogOut size={18}/> Sign out</button>
        <div className="profile"><div className="avatar">U</div><div><strong>Your workspace</strong><small>Local account</small></div><ChevronDown size={16}/></div>
      </div>
    </aside>
    {mobileOpen&&<div className="backdrop" onClick={()=>setMobileOpen(false)}/>}
    <section className="list-panel">
      <header className="list-head"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div><h1>{view==="all"?"All notes":view==="pinned"?"Pinned":"Archive"}</h1><p>{filtered.length} {filtered.length===1?"note":"notes"}</p></div><button className="icon-btn" onClick={createNote}><Plus/></button></header>
      <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notes..." /></div>
      <div className="cards">{filtered.map(n=><button key={n.id} className={"note-card "+(current?.id===n.id?"selected":"")} onClick={()=>setSelected(n.id)}><div className="card-top"><h3>{n.title||"Untitled note"}</h3>{n.pinned&&<Star size={14} fill="currentColor"/>}</div><p>{n.content||"No content yet..."}</p><time>{new Date(n.updated).toLocaleDateString(undefined,{month:"short",day:"numeric"})}</time></button>)}{!filtered.length&&<div className="empty"><FileText size={28}/><strong>No notes here</strong><span>Create your first note to get started.</span><button onClick={createNote}>Create note</button></div>}</div>
    </section>
    <section className="editor">
      <header className="editor-head"><div className="save"><span className="dot"/><span>Saved</span></div><div className="editor-actions"><button className="icon-btn" title="Pin" onClick={()=>current&&update({pinned:!current.pinned})}><Star size={18} fill={current?.pinned?"currentColor":"none"}/></button><button className="icon-btn" title="Archive" onClick={()=>current&&update({archived:!current.archived})}><Archive size={18}/></button><button className="icon-btn danger" title="Delete" onClick={remove}><Trash2 size={18}/></button><button className="icon-btn" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button></div></header>
      {current?<article className="writing"><input className="title" value={current.title} onChange={e=>update({title:e.target.value})} placeholder="Untitled note"/><div className="meta"><span><Hash size={14}/> {current.tags[0]||"notes"}</span><span>Edited {new Date(current.updated).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span></div><textarea value={current.content} onChange={e=>update({content:e.target.value})} placeholder="Start writing..."/><div className="editor-footer"><span>Markdown supported</span><span>{current.content.length} characters</span></div></article>:<div className="blank"><div className="blank-icon">N</div><h2>Your notes, your space.</h2><p>Select a note or create a new one.</p><button onClick={createNote}><Plus size={17}/> Create a note</button></div>}
    </section>
  </main>
}