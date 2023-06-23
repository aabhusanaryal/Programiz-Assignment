const { createApp } = Vue;

createApp({
  data() {
    return {
      message: "Hello Vue!",
      data: [],
      errMsg: "",
      filters: new Set(),
    };
  },
  methods: {
    addFilter(keyword) {
      this.filters.add(keyword);
    },
    removeFilter(keyword) {
      this.filters.delete(keyword);
    },
    clearFilters() {
      this.filters.clear();
    },
  },
  computed: {
    filteredData() {
      return this.data.filter((itm) => {
        let valid = true;
        if (!this.filters.size) return true;
        this.filters.forEach((filter) => {
          if (!itm.keywords.includes(filter)) valid = false;
        });
        return valid;
      });
    },
  },

  async mounted() {
    let data = await fetch(
      "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json"
    );
    this.errMsg = "";
    if (!data.ok) {
      this.errMsg = "There was an error.";
      return;
    }

    data = await data.json();
    console.log(data);
    data.forEach((itm) => this.data.push(itm));
  },
}).mount("#app");
