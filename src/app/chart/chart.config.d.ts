export interface ChartConfig {
  settings: { fill: string, interpolation: string };
  dataset: Array<{ x: string, y: number }>
}

export interface BubbleChartConfig {
  dataset: Array<{ followers_count: number, sentiment: string }>
}
