(function () {
  window.addEventListener('scroll', function() {
      let shadeOpacity = this.window.scrollY / 500;
      let bgScale = (this.window.scrollY * .0004) + 1; // higher number for more zoom
      let textMarginTop = (this.window.scrollY * .2) + 1; // Title speed

      this.document.querySelector('.shade').style.opacity = shadeOpacity;
      this.document.querySelector('.bg').style.transform = `scale(${bgScale})`;
      this.document.querySelector('.text').style.marginTop = textMarginTop;
      
      let header = this.document.querySelector('header');
      let menu = this.document.querySelector('menu');
      if (window.scrollY >= (header.clientHeight - (header.clientHeight*5/100))) {
          menu.classList.remove('fadeOutUp');
          menu.classList.add('fadeInDown');
      } else {
          menu.classList.remove('fadeInDown');
          menu.classList.add('fadeOutUp');
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

window.onload = function(){

  let matchMedia = window.matchMedia("(max-width: 700px)");
  graphOptions.responsive = matchMedia.matches;

  drawGraphFeat();
  drawGraphFix();
  drawGraphRelease();
  drawGraphReleaseFix();
  drawGraphConf();
}

function drawGraphFeat() {

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

function drawGraphFix() {

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

function drawGraphRelease() {

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

function drawGraphReleaseFix() {

  let graphContainer = document.getElementById('graph-release-fix');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let release = gitgraph.branch(branchRelease);
  release.commit();

  let releaseFix = release.branch(branchReleaseFix);
  releaseFix.commit();

  release.merge(releaseFix);
}

function drawGraphConf() {

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