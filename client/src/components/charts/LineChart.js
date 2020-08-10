import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "options", "title", "xtitle", "ytitle", "number"],
  mounted() {
    let options = {}
    if (this.number == 1) {
      options = this.genOptionsSingle(this.title, this.xtitle, this.ytitle)
    } else {
      options = this.options
    }
    
    this.renderChart(this.chartData, options);
  },
  methods: {
    genOptionsSingle(title, xtitle, ytitle) {
      return {
        responsive: true,
        title: {
          display: false,
          text: title,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: xtitle,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: ytitle,
              },
            },
          ],
        },
      }
    }
  },
};
