(() => {
  const cfg = window.APP_CONFIG || {};
  const configured = cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_URL.includes("YOUR_") && !cfg.SUPABASE_ANON_KEY.includes("YOUR_");
  const client = configured && window.supabase
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  const $ = id => document.getElementById(id);
  $("year").textContent = new Date().getFullYear();
  $("menuToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
  document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safeImage = value => { try { const u = new URL(value); return ["https:","http:"].includes(u.protocol) ? u.href : ""; } catch { return ""; } };
  const dateLabel = value => value ? new Date(value + "T00:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}) : "Date to be announced";
  let items = [];

  function renderCards(type, target) {
    const list = items.filter(x => x.type === type && x.published);
    if (!list.length) { $(target).innerHTML = `<div class="empty-state">No ${type === "news" ? "announcements" : type + "s"} published yet. Check back soon!</div>`; return; }
    $(target).innerHTML = list.map((x,i) => `<article class="content-card">${safeImage(x.image_url) ? `<img src="${escapeHTML(safeImage(x.image_url))}" alt="" loading="lazy">` : `<div class="card-placeholder">${type === "event" ? "📅" : type === "news" ? "✳" : "🌱"}</div>`}<div class="content-card-body"><span class="tag">${type === "event" ? dateLabel(x.event_date) : type.toUpperCase()}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.body)}</p></div></article>`).join("");
  }
  function renderEvents() {
    const list = items.filter(x => x.type === "event" && x.published).sort((a,b)=>(a.event_date||"9999").localeCompare(b.event_date||"9999"));
    $("eventsList").innerHTML = list.length ? list.map(x => `<article class="event-row"><div class="event-date">${escapeHTML(dateLabel(x.event_date))}</div><div><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.body)}</p></div><span class="event-arrow">↗</span></article>`).join("") : `<div class="empty-state">No upcoming events have been announced yet.</div>`;
  }
  function renderAll() { renderCards("project","projectsList"); renderEvents(); renderCards("news","newsList"); if (! $("dashboard").classList.contains("hidden")) renderManage(); }

  async function loadPublic() {
    if (!client) return;
    const { data, error } = await client.from("club_content").select("*").eq("published",true).order("created_at",{ascending:false});
    if (!error) { items = data || []; renderAll(); }
  }
  function message(id,text,isError=false) { const el=$(id); el.textContent=text; el.classList.toggle("error",isError); }
  function resetForm() { $("contentForm").reset(); $("itemId").value=""; $("isPublished").checked=true; $("formTitle").textContent="Add website content"; $("cancelEdit").classList.add("hidden"); }
  function renderManage() {
    $("manageList").innerHTML = items.length ? items.map(x=>`<div class="manage-row"><div><b>${escapeHTML(x.title)}</b><small>${escapeHTML(x.type)} · ${x.published?"Published":"Draft"}</small></div><div class="manage-actions"><button data-edit="${x.id}" class="mini-btn">Edit</button><button data-delete="${x.id}" class="mini-btn danger">Delete</button></div></div>`).join("") : `<p class="muted">No content yet.</p>`;
  }
  async function loadAdmin() {
    const {data,error}=await client.from("club_content").select("*").order("created_at",{ascending:false});
    if(error) { message("saveMessage",error.message,true); return; }
    items=data||[]; renderAll();
  }
  async function checkSession() {
    if(!client) return;
    const {data:{session}}=await client.auth.getSession();
    if(session) {
      const {data:profile,error}=await client.from("profiles").select("is_admin").eq("id",session.user.id).maybeSingle();
      if(profile?.is_admin) { $("loginPanel").classList.add("hidden"); $("dashboard").classList.remove("hidden"); await loadAdmin(); }
      else { await client.auth.signOut(); message("loginMessage","This account is not authorised as a club administrator.",true); }
    }
  }
  $("loginForm").addEventListener("submit",async e=>{
    e.preventDefault(); if(!client){message("loginMessage","Connect Supabase first by completing config.js and the setup instructions.",true);return;}
    message("loginMessage","Signing in…");
    const {error}=await client.auth.signInWithPassword({email:$("email").value.trim(),password:$("password").value});
    if(error){message("loginMessage",error.message,true);return;}
    await checkSession();
  });
  $("logoutBtn").addEventListener("click",async()=>{await client.auth.signOut();$("dashboard").classList.add("hidden");$("loginPanel").classList.remove("hidden");resetForm();});
  $("contentForm").addEventListener("submit",async e=>{
    e.preventDefault(); if(!client)return;
    const record={type:$("contentType").value,title:$("contentTitle").value.trim(),body:$("contentBody").value.trim(),image_url:safeImage($("contentImage").value),event_date:$("contentDate").value||null,published:$("isPublished").checked};
    const id=$("itemId").value; message("saveMessage","Saving…");
    const result=id ? await client.from("club_content").update(record).eq("id",id) : await client.from("club_content").insert(record);
    if(result.error){message("saveMessage",result.error.message,true);return;}
    message("saveMessage","Saved successfully."); resetForm(); await loadAdmin(); await loadPublic();
  });
  $("cancelEdit").addEventListener("click",resetForm);
  $("manageList").addEventListener("click",async e=>{
    const edit=e.target.dataset.edit, del=e.target.dataset.delete;
    if(edit){const x=items.find(i=>i.id===edit);if(!x)return;$("itemId").value=x.id;$("contentType").value=x.type;$("contentTitle").value=x.title;$("contentBody").value=x.body;$("contentImage").value=x.image_url||"";$("contentDate").value=x.event_date||"";$("isPublished").checked=x.published;$("formTitle").textContent="Edit website content";$("cancelEdit").classList.remove("hidden");window.scrollTo({top:$("contentForm").offsetTop-80,behavior:"smooth"});}
    if(del && confirm("Delete this item permanently?")){const {error}=await client.from("club_content").delete().eq("id",del);if(error){message("saveMessage",error.message,true);return;}await loadAdmin();await loadPublic();}
  });
  if(!client) { message("loginMessage","Website preview is ready. To enable live content and admin login, connect a Supabase project using SETUP.md.",false); }
  else { loadPublic(); checkSession(); client.auth.onAuthStateChange(()=>checkSession()); }
})();