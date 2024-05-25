(function () {
  window.addEventListener('scroll', function() {
      let shadeOpacity = this.window.scrollY / 500;
      let bgScale = (this.window.scrollY * .0004) + 1;
      let textMarginTop = (this.window.scrollY * .2) + 1;

      this.document.querySelector('header:not(#iframe-header) .shade').style.opacity = shadeOpacity;
      this.document.querySelector('header:not(#iframe-header) .bg').style.transform = `scale(${bgScale})`;
      this.document.querySelector('header:not(#iframe-header) .text').style.marginTop = textMarginTop;

      let header = this.document.querySelector('header');
      let menu = this.document.querySelector('menu');
      if (window.scrollY >= (header.clientHeight - (header.clientHeight*5/100))) {
        menu.classList.remove('fadeOutUp');
        menu.classList.add('fadeInDown');
      } else {
        menu.classList.remove('fadeInDown');
        menu.classList.add('fadeOutUp');       
        closeMenu();
      }
  });
}.call(this));

const graphOptions = {
    orientation: 'vertical-reverse',
    mode: 'compact',
    responsive: true
};

const commitWithoutDot = {
  style: {
    dot: {
      size: 0
    }
  }
}

const branchMaster = {
    name: 'master',
    style: {
        color: 'var(--master)',
        label: {
          strokeColor: 'var(--master)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--master)',
        message: {
          color: 'var(--master)'
        },
        dot: {
          color: 'var(--master)'
        }
      }
    }
};

const branchStaging = {
    name: 'staging',
    style: {
        color: 'var(--staging)',
        label: {
          strokeColor: 'var(--staging)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--staging)',
        message: {
          color: 'var(--staging)'
        },
        dot: {
          color: 'var(--staging)'
        }
      }
    }
};

const branchFeat = {
    name: 'feat',
    style: {
        color: 'var(--feat)',
        label: {
          strokeColor: 'var(--feat)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--feat)',
        message: {
          color: 'var(--feat)'
        },
        dot: {
          color: 'var(--feat)'
        }
      }
    }
};

const branchFix = {
    name: 'fix',
    style: {
        color: 'var(--fix)',
        label: {
          strokeColor: 'var(--fix)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--fix)',
        message: {
          color: 'var(--fix)'
        },
        dot: {
          color: 'var(--fix)'
        }
      }
    }
};

const branchRef = {
    name: 'ref',
    style: {
        color: 'var(--ref)',
        label: {
          strokeColor: 'var(--ref)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--ref)',
        message: {
          color: 'var(--ref)'
        },
        dot: {
          color: 'var(--ref)'
        }
      }
    }
};

const branchRelease = {
    name: 'release',
    style: {
        color: 'var(--release)',
        label: {
          strokeColor: 'var(--release)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--release)',
        message: {
          color: 'var(--release)'
        },
        dot: {
          color: 'var(--release)'
        }
      }
    }
};

const branchReleaseFix = {
    name: 'release/fix',
    style: {
        color: 'var(--release-fix)',
        label: {
          strokeColor: 'var(--release-fix)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--release-fix)',
        message: {
          color: 'var(--release-fix)'
        },
        dot: {
          color: 'var(--release-fix)'
        }
      }
    }
};

const branchConf = {
    name: 'conf',
    style: {
        color: 'var(--conf)',
        label: {
          strokeColor: 'var(--conf)',
          display: 'none'
        }
    },
    commitDefaultOptions: {
      style: {
        color: 'var(--conf)',
        message: {
          color: 'var(--conf)'
        },
        dot: {
          color: 'var(--conf)'
        }
      }
    }
};

function closeMenu() {
  let menuCheck = document.getElementById('mobile-toggle');
  if (menuCheck) {
    menuCheck.checked = false;
  }
}

window.onload = function(){

  let matchMedia = window.matchMedia('(max-width: 700px)');
  graphOptions.responsive = matchMedia.matches;

  drawGraphFeat();
  drawGraphFix();
  //drawGraphRef();
  drawGraphRelease();
  drawGraphReleaseFix();
  drawGraphConf();
}

const pdfOptions = {
  margin:       [0,0,0,0],
  html2canvas:  { scale: 2, dpi: 150 },
  jsPDF:        { orientation: 'portrait', unit: 'px', hotfixes: ['px_scaling'] }
};

async function generateHtmlFile() {

  let link = document.getElementById('download-pdf');
  if (!link || !link.href.includes('#')) return;
  
  let main = document.createElement('main');
  let header = document.querySelector('header');
  if (header) {
    let node = header.cloneNode(true);
    node.id = 'iframe-header';
    main.appendChild(node);

    let bg = main.querySelector('.bg');
    if (bg) {
      bg.style["transform"] = "unset";
      let arrow = bg.querySelector('.arrow.bouncy');
      if (arrow) {
        arrow.parentNode.removeChild(arrow);
      }
    }
    
    let shade = main.querySelector('.shade');
    if (shade) {
      shade.parentNode.removeChild(shade);
    }
  }
  
  let sections = document.querySelectorAll('main section:not(.off):not(.no-print)');
  sections.forEach(e => {
    let node = e.cloneNode(true);
    main.appendChild(node);
  });

  let iframe = document.getElementById('iframe-pdf');
  
  document.head.childNodes.forEach(e => {
    let node = e.cloneNode(true);
    iframe.contentWindow.document.head.appendChild(node);
  });

  iframe.contentWindow.document.body.appendChild(main);

  let footer = document.querySelector('footer.endpage');
  if (footer) {
    let node = footer.cloneNode(true);
    iframe.contentWindow.document.body.appendChild(node);
  }

  let cover, coverNode = iframe.contentWindow.document.body.querySelector('main header');
  pdfOptions.jsPDF.format = [1240, 1754];

  await html3pdf()
          .set(pdfOptions)
          .from(coverNode)
          .toPdf()
          .get('pdf').then(async pdf => {      
            if (pdf) {
              //window.open(pdf.output('bloburl'), '_blank');
              cover = await fetch(pdf.output('bloburl')).then(res => res.arrayBuffer());
            }
          });

  main.removeChild(coverNode);  
  let mainHeight = parseFloat(getComputedStyle(main).fontSize) * 2;

  main = iframe.contentWindow.document.body;
  main.childNodes.forEach(e => {
    mainHeight += e.offsetHeight;
  })

  if (mainHeight < 1754) mainHeight = 1754;

  pdfOptions.jsPDF.format = [1240, mainHeight];

  await html3pdf()
          .set(pdfOptions)
          .from(iframe.contentWindow.document.body)
          .toPdf()
          .get('pdf').then(async pdf => {
            if (pdf) {
              //window.open(pdf.output('bloburl'), '_blank');
              let doc = PDFLib.PDFDocument;
              let main = await fetch(pdf.output('bloburl')).then(res => res.arrayBuffer())
              let pdfCover = await doc.load(cover);
              let pdfMain = await doc.load(main);
              
              let merged = await doc.create(); 
              let copiedPagesCover = await merged.copyPages(pdfCover, pdfCover.getPageIndices());
              copiedPagesCover.forEach((page) => merged.addPage(page)); 
              let copiedPagesMain = await merged.copyPages(pdfMain, pdfMain.getPageIndices());
              copiedPagesMain.forEach((page) => merged.addPage(page)); 
              let file = await merged.save();  

              if (file) {
                const blob = new Blob([file]);
                const url = window.URL.createObjectURL(blob);    
                link.href = url;
                link.download = 'bit-flow.pdf';
              }
            }
          });
}

async function downloadHtml() {

  let link = document.getElementById('download-pdf');
  if (!link) return;

  let loadPdf = document.getElementById('load-pdf');
  if (loadPdf) {
    loadPdf.classList.remove('off');
  }

  await generateHtmlFile();

  if (!link.href.includes('#')) {
    link.click();
  }

  if (loadPdf) {
    loadPdf.classList.add('off');
  }
}

async function drawGraphFeat() {

  let graphContainer = document.getElementById('graph-feat');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let master = gitgraph.branch(branchMaster);
  master.commit();

  let feat = master.branch(branchFeat);
  feat.commit();

  let staging = master.branch(branchStaging);
  staging.merge(feat);

  feat.commit();

  staging.merge(feat);

  let release = master.branch(branchRelease);
  release.merge(feat);

  master.commit(commitWithoutDot);
  master.commit();
}

async function drawGraphFix() {

  let graphContainer = document.getElementById('graph-fix');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let master = gitgraph.branch(branchMaster);
  master.commit();

  let fix = master.branch(branchFix);
  fix.commit();

  let staging = gitgraph.branch(branchStaging);
  staging.merge(fix);

  fix.commit();

  staging.merge(fix);

  let release = master.branch(branchRelease);
  release.merge(fix);

  master.commit(commitWithoutDot);
  master.commit();
}

async function drawGraphRef() {

  let graphContainer = document.getElementById('graph-ref');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let master = gitgraph.branch(branchMaster);
  master.commit();

  let ref = master.branch(branchRef);
  ref.commit();

  let staging = gitgraph.branch(branchStaging);
  staging.merge(ref);

  ref.commit();

  staging.merge(ref);

  let release = master.branch(branchRelease);
  release.merge(ref);

  master.commit(commitWithoutDot);
  master.commit();
}

async function drawGraphRelease() {

  let graphContainer = document.getElementById('graph-release');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let master = gitgraph.branch(branchMaster);
  master.commit();

  let feat = master.branch(branchFeat);
  feat.commit();

  let fix = master.branch(branchFix);
  fix.commit(commitWithoutDot);
  fix.commit();

  branchFeat.name = 'feat-2'
  let feat2 = gitgraph.branch(branchFeat);
  feat2.commit(commitWithoutDot);
  feat2.commit();
  branchFeat.name = 'feat'

  let release = master.branch(branchRelease);
  release.merge(fix);
  release.merge(feat2);
  release.merge(feat);

  let staging = gitgraph.branch(branchStaging);
  staging.merge(release);
  master.merge(release);
}

async function drawGraphReleaseFix() {

  let graphContainer = document.getElementById('graph-release-fix');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let release = gitgraph.branch(branchRelease);
  release.commit();

  let releaseFix = release.branch(branchReleaseFix);
  releaseFix.commit();

  release.merge(releaseFix);
}

async function drawGraphConf() {

  let graphContainer = document.getElementById('graph-conf');  
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let feat = gitgraph.branch(branchFeat);
  feat.commit();

  let staging = feat.branch(branchStaging);
  staging.commit(commitWithoutDot);
  
  let conf = feat.branch(branchConf);
  conf.commit();

  staging.merge(conf);
}

function openModalImg(sender) {

  let modalImg = document.getElementById('modalImg');

  if (!modalImg) return;

  let modalImgElement = modalImg.querySelector('.modal-content');  
  modalImg.style.display = 'flex';
  modalImgElement.src = sender.src;
  modalImgElement.alt = sender.alt;

  if (modalImg.onclick) return;
  
  modalImg.onclick = closeModalImg;
}

function closeModalImg() {

  let modalImg = document.getElementById('modalImg');

  if (!modalImg) return;

  modalImg.style.display = 'none';
}