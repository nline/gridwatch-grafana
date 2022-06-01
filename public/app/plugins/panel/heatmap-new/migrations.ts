import { FieldConfigSource, PanelModel, PanelTypeChangedHandler } from '@grafana/data';
import { ScaleDistribution, VisibilityMode } from '@grafana/schema';
import {
  HeatmapCalculationMode,
  HeatmapCalculationOptions,
} from 'app/features/transformers/calculateHeatmap/models.gen';

import { HeatmapMode, PanelOptions, defaultPanelOptions, HeatmapColorMode } from './models.gen';
import { colorSchemes } from './palettes';

/**
 * This is called when the panel changes from another panel
 */
export const heatmapChangedHandler: PanelTypeChangedHandler = (panel, prevPluginId, prevOptions, prevFieldConfig) => {
  if (prevPluginId === 'heatmap' && prevOptions.angular) {
    const { fieldConfig, options } = angularToReactHeatmap({
      ...prevOptions.angular,
      fieldConfig: prevFieldConfig,
    });
    panel.fieldConfig = fieldConfig; // Mutates the incoming panel
    return options;
  }
  return {};
};

export function angularToReactHeatmap(angular: any): { fieldConfig: FieldConfigSource; options: PanelOptions } {
  const fieldConfig: FieldConfigSource = {
    defaults: {},
    overrides: [],
  };

  const mode = angular.dataFormat === 'tsbuckets' ? HeatmapMode.Aggregated : HeatmapMode.Calculate;
  const calculate: HeatmapCalculationOptions = {
    ...defaultPanelOptions.calculate,
  };

  if (mode === HeatmapMode.Calculate) {
    if (angular.xBucketSize) {
      calculate.xAxis = { mode: HeatmapCalculationMode.Size, value: `${angular.xBucketSize}` };
    } else if (angular.xBucketNumber) {
      calculate.xAxis = { mode: HeatmapCalculationMode.Count, value: `${angular.xBucketNumber}` };
    }

    if (angular.yBucketSize) {
      calculate.yAxis = { mode: HeatmapCalculationMode.Size, value: `${angular.yBucketSize}` };
    } else if (angular.xBucketNumber) {
      calculate.yAxis = { mode: HeatmapCalculationMode.Count, value: `${angular.yBucketNumber}` };
    }

    const oldYAxis = { logBase: 1, ...angular.yAxis };
    if (oldYAxis.logBase > 1) {
      calculate.yAxis = {
        mode: HeatmapCalculationMode.Count,
        value: +oldYAxis.splitFactor > 0 ? `${oldYAxis.splitFactor}` : undefined,
        scale: {
          type: ScaleDistribution.Log,
          log: oldYAxis.logBase,
        },
      };
    }
  }

  const options: PanelOptions = {
    mode,
    calculate,
    color: {
      ...defaultPanelOptions.color,
      steps: 128, // best match with existing colors
    },
    cellGap: asNumber(angular.cards?.cardPadding),
    cellSize: asNumber(angular.cards?.cardRound),
    yAxisLabels: angular.yBucketBound,
    yAxisReverse: angular.reverseYBuckets,
    legend: {
      show: Boolean(angular.legend.show),
    },
    showValue: VisibilityMode.Never,
    tooltip: {
      show: Boolean(angular.tooltip?.show),
      yHistogram: Boolean(angular.tooltip?.showHistogram),
    },
    exemplars: {
      ...defaultPanelOptions.exemplars,
    },
  };

  if (angular.hideZeroBuckets) {
    options.filterValues = { ...defaultPanelOptions.filterValues }; // min: 1e-9
  }

  // Migrate color options
  const color = angular.color;
  switch (color?.mode) {
    case 'spectrum': {
      options.color.mode = HeatmapColorMode.Scheme;

      const current = color.colorScheme as string;
      let scheme = colorSchemes.find((v) => v.name === current);
      if (!scheme) {
        scheme = colorSchemes.find((v) => current.indexOf(v.name) >= 0);
      }
      options.color.scheme = scheme ? scheme.name : defaultPanelOptions.color.scheme;
      break;
    }
    case 'opacity': {
      options.color.mode = HeatmapColorMode.Opacity;
      options.color.scale = color.scale;
      break;
    }
  }
  options.color.min = color.min;
  options.color.max = color.max;

  return { fieldConfig, options };
}

function asNumber(v: any): number | undefined {
  const num = +v;
  return isNaN(num) ? undefined : num;
}

export const heatmapMigrationHandler = (panel: PanelModel): Partial<PanelOptions> => {
  // Migrating from angular
  if (!panel.pluginVersion && Object.keys(panel.options).length === 0) {
    return heatmapChangedHandler(panel, 'heatmap', { angular: panel }, panel.fieldConfig);
  }
  return panel.options;
};
