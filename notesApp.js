
function notesApp() {
  return {
    selectedTopic: null,
    selectedSubtopic: null,
    showSidebar: window.innerWidth >= 1024,
    activeFile: null,
    openDropdown:{},
    showFileList: false,
    topics: {},
    searchQuery: '',
    searchResults: [],
    isSearching: false,
    previousTopic: null,
    previousSubtopic: null,

    async init() {
      const res = await fetch('topics.json');
      this.topics = await res.json();
    },
    selectTopicAndSubtopic(topicKey, subIndex) {
      
      this.selectedTopic = topicKey;
      this.selectedSubtopic = subIndex;
      this.activeFile = null;
      this.isSearching = false;
    },
    toggleDropdown(topicKey){
      this.openDropdown[topicKey] = !this.openDropdown[topicKey];
      this.selectedTopic = topicKey;
      this.selectedSubtopic = null; // Reset subtopic selection
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
    },
    searchFiles() {
      const q = this.searchQuery.toLowerCase().trim();
      if (q) {
        if (!this.isSearching) {
          this.previousTopic = this.selectedTopic;
          this.previousSubtopic = this.selectedSubtopic;
        }
        this.isSearching = true;
        this.searchResults = [];
        for (const [topicKey, topic] of Object.entries(this.topics)) {
          for (const [subIndex, subtopic] of topic.subtopics.entries()) {
            for (const file of subtopic.files) {
              if (
                file.name.toLowerCase().includes(q) || file.tags.toLowerCase().includes(q)
              ) {
                this.searchResults.push({
                  topicKey,
                  subIndex,
                  file
                });
              }
            }
          }
        }
      }else {
        this.isSearching = false;
        this.searchResults = [];

        // Restore previously selected topic/subtopic
        this.selectedTopic = this.previousTopic;
        this.selectedSubtopic = this.previousSubtopic;
      }

      
    }
  };
}
