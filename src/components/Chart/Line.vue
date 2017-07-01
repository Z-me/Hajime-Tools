<script>
import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
    console.log(this.chartData)
    console.log(this.options)
  }
})
</script>
