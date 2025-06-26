
function notesApp() {
  return {
    selectedTopic: null,
    selectedSubtopic: null,
    showSidebar: window.innerWidth >= 1024,
    activeFile: null,
    openDropdown:{},
    showFileList: false,
    topics: {
      math: {
        name: 'Number theory',
        subtopics: [
          {
            name: 'Group Theory',
            files: [
              {
                name: 'Stanford GT notes',
                type: 'file',
                path: './Docs/Number_Theory/Stanford_GT/Stanford_GT_NOTES.pdf',
                thumbnail: './images/qr.png',
                caption: 'Quadratic residues, Field extensions, Polynomial irreducibility'
              },
              {
                name: 'Primality testing',
                type: 'file',
                path: './Docs/Number_Theory/Primality_tests/AKS_primality_v6.pdf',
                thumbnail: './images/prime.png',
                caption: 'AKS primaility testing'
              }
            ]
          }
        ]
      },
      zkp: {
        name: 'ZK Proofs',
        subtopics: [
          {
            name: 'PLONK',
            files: [
              {
                name: 'PLONK paper',
                type: 'file',
                path: './Docs/ZKP/PLONK/Plonk_2019-953.pdf',
                thumbnail: './images/plonk.png',
                caption: 'Quick sort algorithm'
              },
              {
                name: 'Permutation Check',
                type: 'file',
                path: './Docs/ZKP/PLONK/Permutation_check___PLONK.pdf',
                thumbnail: './images/plonkgpp.png',
                caption: 'Permutation check'
              }
            ]
          },
	      {
            name: 'GKR IP',
            files: [
              {
                name: 'GKR Notes',
                type: 'file',
                path: './Docs/ZKP/GKR/GKR.pdf',
                thumbnail: './images/gkr.png',
                caption: 'GKR Interactive Proof protocol'
              },
              {
                name: 'Reduction',
                type: 'file',
                path: './Docs/ZKP/GKR/Multiple_poly_eval_reduction.pdf',
                thumbnail: './images/reduc.png',
                caption: 'Reduction of multiple polynomial evaluation verification to one'
              },
            ]
          },
          {
            name: 'Elliptic_curves',
            files: [
              {
                name: 'Bilinear Pairings',
                type: 'file',
                path: './Docs/ZKP/Elliptic_curves/pairings.pdf',
                thumbnail: './images/pairings.png',
                caption: 'Pairing'
              },
              {
                name: 'Hash to curve',
                type: 'file',
                path: './Docs/ZKP/Elliptic_curves/Paper_hash2curve.pdf',
                thumbnail: './images/hash2curve.png',
                caption: 'Hash to curve algorithms'
              },
              {
                name: 'Isogenies',
                type: 'file',
                path: './Docs/ZKP/Elliptic_curves/isogney_paper.pdf',
                thumbnail: './images/isogeny.png',
                caption: 'Isogenies over EC'
              }
            ]
          },
          {
            name: 'Succint args using relaxed PCS',
            files:[
                {
                    name: 'Low Degree Test',
                    type: 'file',
                    path: './Docs/ZKP/PAZK_C7/Low_Degree_Test.pdf',
                    thumbnail: './images/ldt.png',
                    caption: 'Line vs Point test'
                },
                {
                    name: 'Relaxed PCS',
                    type: 'file',
                    path: './Docs/ZKP/PAZK_C7/Relaxed_PCS.pdf',
                    thumbnail: './images/pazkc7.png',
                    caption: 'Personal notes of Chapter 7'
                }
            ]
            },
          
              {
            name: 'Study material',
            files: [
              {
                name: 'ProofsArgs&ZK',
                type: 'file',
                path: './Docs/ZKP/StuMat/ProofsArgsAndZK.pdf',
                thumbnail: './images/pazk.png',
                caption: 'Justin Thaler'
              },
              {
                name: 'SNARKs lineage',
                type: 'file',
                path: './Docs/ZKP/StuMat/SIgma_ZKP_SNARKs_relation.pdf',
                thumbnail: './images/lineage.png',
                caption: 'Relationship between Sigma protocols, SNARKs and ZK proofs'
              },
              {
                name: 'Survey SNARKs',
                type: 'file',
                path: './Docs/ZKP/StuMat/Survey-SNARKs.pdf',
                thumbnail: './images/zk-make.png',
                caption: 'Short notes on ZK snark'
              },
              
              {
                name: 'Zokrates',
                type: 'file',
                path: './Docs/ZKP/StuMat/Zokrates.pdf',
                thumbnail: './images/zok.png',
                caption: 'Slides on Zokrates toolkit'
              }
              
            ]
          },
          
        ]
      },
      misc: {
        name: 'Miscellaneous',
        subtopics: [
          {
            name: 'Quantum_crypto',
            files: [
              {
                name: 'FFT',
                type: 'file',
                path: './Docs/Miscellaneous/Quantum_crypto/fft.pdf',
                thumbnail: './images/fftimg.png',
                caption: 'Fast fourier transform'
              },
              {
                name: 'Shor\'s original paper',
                type: 'file',
                path: './Docs/Miscellaneous/Quantum_crypto/shors.pdf',
                thumbnail: './images/shor.png',
                caption: 'Shors factoring'
              }
            ]
          },
          {
            name: 'Handwritten notes',
            files: [
              {
                name: 'Blockchain',
                type: 'file',
                path: './Docs/Miscellaneous/Handwritten\ notes/BLK.pdf',
                thumbnail: './images/default.jpg',
                caption: ''
              },
              {
                name: 'Cryptography',
                type: 'file',
                path: './Docs/Miscellaneous/Handwritten\ notes/CRYP.pdf',
                thumbnail: './images/default.jpg',
                caption: ''
              },
              {
                name: 'Design Analysis of Algorithms',
                type: 'file',
                path: './Docs/Miscellaneous/Handwritten\ notes/DAA.pdf',
                thumbnail: './images/default.jpg',
                caption: ''
              },
              {
                name: 'Integral Domains',
                type: 'file',
                path: './Docs/Miscellaneous/Handwritten\ notes/ED_PID_UFD.pdf',
                thumbnail: './images/default.jpg',
                caption: ''
              },
              {
                name: 'Quantum cryptography',
                type: 'file',
                path: './Docs/Miscellaneous/Handwritten\ notes/QNTM.pdf',
                thumbnail: './images/default.jpg',
                caption: ''
              },

        ]
      }]},
      res: {
        name: 'Resources',
        subtopics: [
          {
            name: 'Web resources',
            files: [
              {
                name: 'Operating Systems ',
                type: 'html',
                htmlPath: './Docs/Bookmarks/os_net/prog.html',
                content: '',
                thumbnail: './images/os.jpg',
                caption: ''
              },
              {
                name: 'Programming',
                type: 'html',
                htmlPath: './Docs/Bookmarks/Programming/prog.html',
                content: '',
                thumbnail: './images/prog.jpg',
                caption: ''
              },
              {
                name: 'ZK & Blockchain',
                type: 'html',
                htmlPath: './Docs/Bookmarks/zk_bc/prog.html',
                content: '',
                thumbnail: './images/bc.jpg',
                caption: ''
              },
              {
                name: 'Misc',
                type: 'html',
                htmlPath: './Docs/Bookmarks/rest/prog.html',
                content: '',
                thumbnail: './images/default.jpg',
                caption: ''
              },
              
            ]
          }
        ]
      },
    },
    selectTopicAndSubtopic(topicKey, subIndex) {
      
      this.selectedTopic = topicKey;
      this.selectedSubtopic = subIndex;
      this.activeFile = null;
    },
    toggleDropdown(topicKey){
      this.openDropdown[topicKey] = !this.openDropdown[topicKey];
      this.selectedTopic = topicKey;
      this.selectedSubtopic = null;
      this.activeFile = null;
    },
    selectFile(file) {
      if (file.type === 'html' && file.htmlPath) {
        fetch(file.htmlPath)
          .then(res => res.text())
          .then(html => {
            file.content = html;
            this.activeFile = file;
          });
      } else {
        this.activeFile = file;
      }
    }
  };
}
