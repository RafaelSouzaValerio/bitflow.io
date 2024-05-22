(function(){window.addEventListener("scroll",(function(){let e=this.window.scrollY/500,t=4e-4*this.window.scrollY+1,a=.2*this.window.scrollY+1;this.document.querySelector(".shade").style.opacity=e,this.document.querySelector(".bg").style.transform=`scale(${t})`,this.document.querySelector(".text").style.marginTop=a;let o=this.document.querySelector("header"),r=this.document.querySelector("menu");window.scrollY>=o.clientHeight-5*o.clientHeight/100?(r.classList.remove("fadeOutUp"),r.classList.add("fadeInDown")):(r.classList.remove("fadeInDown"),r.classList.add("fadeOutUp"),closeMenu())}))}).call(this);const graphOptions={orientation:"vertical-reverse",mode:"compact",responsive:!0},commitWithoutDot={style:{dot:{size:0}}},branchMaster={name:"master",style:{color:"var(--master)",label:{strokeColor:"var(--master)",display:"none"}},commitDefaultOptions:{style:{color:"var(--master)",message:{color:"var(--master)"},dot:{color:"var(--master)"}}}},branchStaging={name:"staging",style:{color:"var(--staging)",label:{strokeColor:"var(--staging)",display:"none"}},commitDefaultOptions:{style:{color:"var(--staging)",message:{color:"var(--staging)"},dot:{color:"var(--staging)"}}}},branchFeat={name:"feat",style:{color:"var(--feat)",label:{strokeColor:"var(--feat)",display:"none"}},commitDefaultOptions:{style:{color:"var(--feat)",message:{color:"var(--feat)"},dot:{color:"var(--feat)"}}}},branchFix={name:"fix",style:{color:"var(--fix)",label:{strokeColor:"var(--fix)",display:"none"}},commitDefaultOptions:{style:{color:"var(--fix)",message:{color:"var(--fix)"},dot:{color:"var(--fix)"}}}},branchRef={name:"ref",style:{color:"var(--ref)",label:{strokeColor:"var(--ref)",display:"none"}},commitDefaultOptions:{style:{color:"var(--ref)",message:{color:"var(--ref)"},dot:{color:"var(--ref)"}}}},branchRelease={name:"release",style:{color:"var(--release)",label:{strokeColor:"var(--release)",display:"none"}},commitDefaultOptions:{style:{color:"var(--release)",message:{color:"var(--release)"},dot:{color:"var(--release)"}}}},branchReleaseFix={name:"release/fix",style:{color:"var(--release-fix)",label:{strokeColor:"var(--release-fix)",display:"none"}},commitDefaultOptions:{style:{color:"var(--release-fix)",message:{color:"var(--release-fix)"},dot:{color:"var(--release-fix)"}}}},branchConf={name:"conf",style:{color:"var(--conf)",label:{strokeColor:"var(--conf)",display:"none"}},commitDefaultOptions:{style:{color:"var(--conf)",message:{color:"var(--conf)"},dot:{color:"var(--conf)"}}}};function closeMenu(){let e=document.getElementById("mobile-toggle");e&&(e.checked=!1)}async function generateHtmlFile(){let e,t=document.getElementById("download-pdf");if(!t||!t.href.includes("#"))return;let a=document.querySelector("header");await html3pdf().set({margin:[0,0,0,0],jsPDF:{orientation:"portrait",unit:"px",format:[window.innerWidth,window.innerHeight]}}).from(a).toPdf().get("pdf").then((async t=>{t&&(e=await fetch(t.output("bloburl")).then((e=>e.arrayBuffer())))}));let o=document.createElement("main");document.querySelectorAll("main section:not(.off):not(.no-print)").forEach((e=>{let t=e.cloneNode(!0);o.appendChild(t)}));let r=document.documentElement,n=document.body,c=Math.max(n.scrollWidth,n.offsetWidth,r.clientWidth,r.scrollWidth,r.offsetWidth),l=document.querySelector("main"),i=getComputedStyle(l),m=parseInt(i.paddingTop)+parseInt(i.paddingBottom);i=l.clientHeight-m,await html3pdf().set({margin:[0,0,0,0],jsPDF:{orientation:"portrait",unit:"px",format:[c,i]}}).from(o).toPdf().get("pdf").then((async a=>{if(a){let o=PDFLib.PDFDocument,r=await fetch(a.output("bloburl")).then((e=>e.arrayBuffer())),n=await o.load(e),c=await o.load(r),l=await o.create();(await l.copyPages(n,n.getPageIndices())).forEach((e=>l.addPage(e))),(await l.copyPages(c,c.getPageIndices())).forEach((e=>l.addPage(e)));let i=await l.save();if(i){const e=new Blob([i]),a=window.URL.createObjectURL(e);t.href=a,t.download="bit-flow.pdf",downloadHtml()}}}))}async function downloadHtml(){let e=document.getElementById("download-pdf");if(!e)return;let t=document.getElementById("load-pdf");t&&t.classList.remove("off"),await generateHtmlFile(),e.href.includes("#")||e.click(),t&&t.classList.add("off")}async function drawGraphFeat(){let e=document.getElementById("graph-feat"),t=GitgraphJS.createGitgraph(e,graphOptions).branch(branchMaster);t.commit();let a=t.branch(branchFeat);a.commit();let o=t.branch(branchStaging);o.merge(a),a.commit(),o.merge(a),t.branch(branchRelease).merge(a),t.commit(commitWithoutDot),t.commit()}async function drawGraphFix(){let e=document.getElementById("graph-fix"),t=GitgraphJS.createGitgraph(e,graphOptions),a=t.branch(branchMaster);a.commit();let o=a.branch(branchFix);o.commit();let r=t.branch(branchStaging);r.merge(o),o.commit(),r.merge(o),a.branch(branchRelease).merge(o),a.commit(commitWithoutDot),a.commit()}async function drawGraphRef(){let e=document.getElementById("graph-ref"),t=GitgraphJS.createGitgraph(e,graphOptions),a=t.branch(branchMaster);a.commit();let o=a.branch(branchRef);o.commit();let r=t.branch(branchStaging);r.merge(o),o.commit(),r.merge(o),a.branch(branchRelease).merge(o),a.commit(commitWithoutDot),a.commit()}async function drawGraphRelease(){let e=document.getElementById("graph-release"),t=GitgraphJS.createGitgraph(e,graphOptions),a=t.branch(branchMaster);a.commit();let o=a.branch(branchFeat);o.commit();let r=a.branch(branchFix);r.commit(commitWithoutDot),r.commit(),branchFeat.name="feat-2";let n=t.branch(branchFeat);n.commit(commitWithoutDot),n.commit(),branchFeat.name="feat";let c=a.branch(branchRelease);c.merge(r),c.merge(n),c.merge(o),t.branch(branchStaging).merge(c),a.merge(c)}async function drawGraphReleaseFix(){let e=document.getElementById("graph-release-fix"),t=GitgraphJS.createGitgraph(e,graphOptions).branch(branchRelease);t.commit();let a=t.branch(branchReleaseFix);a.commit(),t.merge(a)}async function drawGraphConf(){let e=document.getElementById("graph-conf"),t=GitgraphJS.createGitgraph(e,graphOptions).branch(branchFeat);t.commit();let a=t.branch(branchStaging);a.commit(commitWithoutDot);let o=t.branch(branchConf);o.commit(),a.merge(o)}function openModalImg(e){let t=document.getElementById("modalImg");if(!t)return;let a=t.querySelector(".modal-content");t.style.display="flex",a.src=e.src,a.alt=e.alt,t.onclick||(t.onclick=closeModalImg)}function closeModalImg(){let e=document.getElementById("modalImg");e&&(e.style.display="none")}window.onload=function(){let e=window.matchMedia("(max-width: 700px)");graphOptions.responsive=e.matches,drawGraphFeat(),drawGraphFix(),drawGraphRef(),drawGraphRelease(),drawGraphReleaseFix(),drawGraphConf()};