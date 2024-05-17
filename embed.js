const graphOptions = {
    orientation: 'vertical-reverse',
    mode: 'compact'
};

const branchMaster = {
    name: 'master',
    style: {
        color: '#3a4678',
        label: {
          strokeColor: "#3a4678"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#3a4678",
        message: {
          color: "#3a4678"
        },
        dot: {
          color: "#3a4678"
        }
      }
    }
};

const branchStaging = {
    name: 'staging',
    style: {
        color: '#9dd651',
        label: {
          strokeColor: "#9dd651"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#9dd651",
        message: {
          color: "#9dd651"
        },
        dot: {
          color: "#9dd651"
        }
      }
    }
};

const branchFeat = {
    name: 'feat',
    style: {
        color: '#8ac5d9',
        label: {
          strokeColor: "#8ac5d9"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#8ac5d9",
        message: {
          color: "#8ac5d9"
        },
        dot: {
          color: "#8ac5d9"
        }
      }
    }
};

const branchFix = {
    name: 'fix',
    style: {
        color: '#ff5143',
        label: {
          strokeColor: "#ff5143"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#ff5143",
        message: {
          color: "#ff5143"
        },
        dot: {
          color: "#ff5143"
        }
      }
    }
};

const branchRelease = {
    name: 'release',
    style: {
        color: '#ff7f27',
        label: {
          strokeColor: "#ff7f27"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#ff7f27",
        message: {
          color: "#ff7f27"
        },
        dot: {
          color: "#ff7f27"
        }
      }
    }
};

const branchReleaseFix = {
    name: 'Release/Fix',
    style: {
        color: '#fbd150',
        label: {
          strokeColor: "#fbd150"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "#fbd150",
        message: {
          color: "#fbd150"
        },
        dot: {
          color: "#fbd150"
        }
      }
    }
};

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

window.onload = function(){

    drawGraphFeat();
    drawGraphFix();
    drawGraphRelease();
    drawGraphReleaseFix();

    // staging.commit("Prepare v1");

    // master.merge(staging).tag("v1.0.0");
}

function drawGraphFeat() {

  let graphContainer = document.getElementById('graph-feat');
  let gitgraph = GitgraphJS.createGitgraph(graphContainer, graphOptions);

  let master = gitgraph.branch(branchMaster);
  master.commit();

  let feat = master.branch(branchFeat);
  feat.commit();

  let staging = gitgraph.branch(branchStaging);
  staging.merge(feat);

  feat.commit();

  staging.merge(feat);

  let release = master.branch(branchRelease);
  release.merge(feat);

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
  fix.commit();

  let feat2Options = branchFeat;
  feat2Options.name = "feat-2"
  let feat2 = gitgraph.branch(feat2Options);
  feat2.commit();

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