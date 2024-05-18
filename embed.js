const graphOptions = {
    orientation: 'vertical-reverse',
    mode: 'compact'
};

const branchMaster = {
    name: 'master',
    style: {
        color: 'var(--master)',
        label: {
          strokeColor: "var(--master)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--master)",
        message: {
          color: "var(--master)"
        },
        dot: {
          color: "var(--master)"
        }
      }
    }
};

const branchStaging = {
    name: 'staging',
    style: {
        color: 'var(--staging)',
        label: {
          strokeColor: "var(--staging)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--staging)",
        message: {
          color: "var(--staging)"
        },
        dot: {
          color: "var(--staging)"
        }
      }
    }
};

const branchFeat = {
    name: 'feat',
    style: {
        color: 'var(--feat)',
        label: {
          strokeColor: "var(--feat)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--feat)",
        message: {
          color: "var(--feat)"
        },
        dot: {
          color: "var(--feat)"
        }
      }
    }
};

const branchFix = {
    name: 'fix',
    style: {
        color: 'var(--fix)',
        label: {
          strokeColor: "var(--fix)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--fix)",
        message: {
          color: "var(--fix)"
        },
        dot: {
          color: "var(--fix)"
        }
      }
    }
};

const branchRelease = {
    name: 'release',
    style: {
        color: 'var(--release)',
        label: {
          strokeColor: "var(--release)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--release)",
        message: {
          color: "var(--release)"
        },
        dot: {
          color: "var(--release)"
        }
      }
    }
};

const branchReleaseFix = {
    name: 'Release/Fix',
    style: {
        color: 'var(--release-fix)',
        label: {
          strokeColor: "var(--release-fix)"
        }
    },
    commitDefaultOptions: {
      style: {
        color: "var(--release-fix)",
        message: {
          color: "var(--release-fix)"
        },
        dot: {
          color: "var(--release-fix)"
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