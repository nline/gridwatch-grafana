// NOTE: by default Component string selectors are set up to be aria-labels,
// however there are many cases where your component may not need an aria-label
// (a <button> with clear text, for example, does not need an aria-label as it's already labeled)
// but you still might need to select it for testing,
// in that case please add the attribute data-testid={selector} in the component and
// prefix your selector string with 'data-testid' so that when create the selectors we know to search for it on the right attribute
/**
 * Selectors grouped/defined in Components
 *
 * @alpha
 */
export const Components = {
  RadioButton: {
    container: 'data-testid radio-button',
  },
  Breadcrumbs: {
    breadcrumb: (title: string) => `data-testid ${title} breadcrumb`,
  },
  TimePicker: {
    openButton: 'data-testid TimePicker Open Button',
    overlayContent: 'data-testid TimePicker Overlay Content',
    fromField: 'data-testid Time Range from field',
    toField: 'data-testid Time Range to field',
    applyTimeRange: 'data-testid TimePicker submit button',
    calendar: {
      label: 'data-testid Time Range calendar',
      openButton: 'data-testid Open time range calendar',
      closeButton: 'data-testid Close time range Calendar',
    },
    absoluteTimeRangeTitle: 'data-testid-absolute-time-range-narrow',
  },
  DataSourcePermissions: {
    form: () => 'form[name="addPermission"]',
    roleType: 'Role to add new permission to',
    rolePicker: 'Built-in role picker',
    permissionLevel: 'Permission Level',
  },
  DateTimePicker: {
    input: 'data-testid date-time-input',
  },
  DataSource: {
    TestData: {
      QueryTab: {
        scenarioSelectContainer: 'Test Data Query scenario select container',
        scenarioSelect: 'Test Data Query scenario select',
        max: 'TestData max',
        min: 'TestData min',
        noise: 'TestData noise',
        seriesCount: 'TestData series count',
        spread: 'TestData spread',
        startValue: 'TestData start value',
        drop: 'TestData drop values',
      },
    },
    DataSourceHttpSettings: {
      urlInput: 'Datasource HTTP settings url',
    },
    Jaeger: {
      traceIDInput: 'Trace ID',
    },
    Prometheus: {
      configPage: {
        connectionSettings: 'Data source connection URL', // aria-label in grafana experimental
        manageAlerts: 'prometheus-alerts-manager', // id for switch component
        scrapeInterval: 'data-testid scrape interval',
        queryTimeout: 'data-testid query timeout',
        defaultEditor: 'data-testid default editor',
        disableMetricLookup: 'disable-metric-lookup', // id for switch component
        prometheusType: 'data-testid prometheus type',
        prometheusVersion: 'data-testid prometheus version',
        cacheLevel: 'data-testid cache level',
        incrementalQuerying: 'prometheus-incremental-querying', // id for switch component
        queryOverlapWindow: 'data-testid query overlap window',
        disableRecordingRules: 'disable-recording-rules', // id for switch component
        customQueryParameters: 'data-testid custom query parameters',
        httpMethod: 'data-testid http method',
        exemplarsAddButton: 'data-testid Add exemplar config button',
        internalLinkSwitch: 'data-testid Internal link switch',
      },
      queryEditor: {
        // kickstart: '', see QueryBuilder queryPatterns below
        explain: 'prometheus-explain-wrapper', // switch wrapper id
        editorToggle: 'data-testid QueryEditorModeToggle', // need to change this in shared folder
        options: 'data-testid prometheus-options', //// id wrapper for options group collapse component
        legend: 'legend-wrapper', // wrapper for multiple compomnents
        format: 'data-testid prometheus format',
        step: 'prometheus-step', // id for autosize component
        type: 'data-testid prometheus type', //wrapper for radio button group
        exemplars: 'prometheus-exemplars', // id for editor switch component
        builder: {},
        code: {},
      },
      exemplarMarker: 'data-testid Exemplar marker',
    },
  },
  Menu: {
    MenuComponent: (title: string) => `${title} menu`,
    MenuGroup: (title: string) => `${title} menu group`,
    MenuItem: (title: string) => `${title} menu item`,
    SubMenu: {
      container: 'data-testid SubMenu container',
      icon: 'data-testid SubMenu icon',
    },
  },
  Panels: {
    Panel: {
      title: (title: string) => `data-testid Panel header ${title}`,
      headerItems: (item: string) => `data-testid Panel header item ${item}`,
      menuItems: (item: string) => `data-testid Panel menu item ${item}`,
      menu: (title: string) => `data-testid Panel menu ${title}`,
      containerByTitle: (title: string) => `${title} panel`,
      headerCornerInfo: (mode: string) => `Panel header ${mode}`,
      status: (status: string) => `data-testid Panel status ${status}`,
      loadingBar: () => `Panel loading bar`,
      HoverWidget: {
        container: 'data-testid hover-header-container',
        dragIcon: 'data-testid drag-icon',
      },
    },
    Visualization: {
      Graph: {
        container: 'Graph container',
        VisualizationTab: {
          legendSection: 'Legend section',
        },
        Legend: {
          legendItemAlias: (name: string) => `gpl alias ${name}`,
          showLegendSwitch: 'gpl show legend',
        },
        xAxis: {
          labels: () => 'div.flot-x-axis > div.flot-tick-label',
        },
      },
      BarGauge: {
        /**
         * @deprecated use valueV2 from Grafana 8.3 instead
         */
        value: 'Bar gauge value',
        valueV2: 'data-testid Bar gauge value',
      },
      PieChart: {
        svgSlice: 'data testid Pie Chart Slice',
      },
      Text: {
        container: () => '.markdown-html',
      },
      Table: {
        header: 'table header',
        footer: 'table-footer',
        body: 'data-testid table body',
      },
    },
  },
  VizLegend: {
    seriesName: (name: string) => `data-testid VizLegend series ${name}`,
  },
  Drawer: {
    General: {
      title: (title: string) => `Drawer title ${title}`,
      expand: 'Drawer expand',
      contract: 'Drawer contract',
      close: 'data-testid Drawer close',
      rcContentWrapper: () => '.rc-drawer-content-wrapper',
    },
  },
  PanelEditor: {
    General: {
      content: 'Panel editor content',
    },
    OptionsPane: {
      content: 'Panel editor option pane content',
      select: 'Panel editor option pane select',
      fieldLabel: (type: string) => `${type} field property editor`,
    },
    // not sure about the naming *DataPane*
    DataPane: {
      content: 'Panel editor data pane content',
    },
    applyButton: 'data-testid Apply changes and go back to dashboard',
    toggleVizPicker: 'data-testid toggle-viz-picker',
    toggleVizOptions: 'data-testid toggle-viz-options',
    toggleTableView: 'toggle-table-view',

    // [Geomap] Map controls
    showZoomField: 'Map controls Show zoom control field property editor',
    showAttributionField: 'Map controls Show attribution field property editor',
    showScaleField: 'Map controls Show scale field property editor',
    showMeasureField: 'Map controls Show measure tools field property editor',
    showDebugField: 'Map controls Show debug field property editor',

    measureButton: 'show measure tools',
  },
  PanelInspector: {
    Data: {
      content: 'Panel inspector Data content',
    },
    Stats: {
      content: 'Panel inspector Stats content',
    },
    Json: {
      content: 'Panel inspector Json content',
    },
    Query: {
      content: 'Panel inspector Query content',
      refreshButton: 'Panel inspector Query refresh button',
      jsonObjectKeys: () => '.json-formatter-key',
    },
  },
  Tab: {
    title: (title: string) => `Tab ${title}`,
    active: () => '[class*="-activeTabStyle"]',
  },
  RefreshPicker: {
    /**
     * @deprecated use runButtonV2 from Grafana 8.3 instead
     */
    runButton: 'RefreshPicker run button',
    /**
     * @deprecated use intervalButtonV2 from Grafana 8.3 instead
     */
    intervalButton: 'RefreshPicker interval button',
    runButtonV2: 'data-testid RefreshPicker run button',
    intervalButtonV2: 'data-testid RefreshPicker interval button',
  },
  QueryTab: {
    content: 'Query editor tab content',
    queryInspectorButton: 'Query inspector button',
    queryHistoryButton: 'data-testid query-history-button',
    addQuery: 'data-testid query-tab-add-query',
  },
  QueryHistory: {
    queryText: 'Query text',
  },
  QueryEditorRows: {
    rows: 'Query editor row',
  },
  QueryEditorRow: {
    actionButton: (title: string) => `${title}`,
    title: (refId: string) => `Query editor row title ${refId}`,
    container: (refId: string) => `Query editor row ${refId}`,
  },
  AlertTab: {
    content: 'data-testid Alert editor tab content',
  },
  Alert: {
    /**
     * @deprecated use alertV2 from Grafana 8.3 instead
     */
    alert: (severity: string) => `Alert ${severity}`,
    alertV2: (severity: string) => `data-testid Alert ${severity}`,
  },
  TransformTab: {
    content: 'data-testid Transform editor tab content',
    newTransform: (name: string) => `data-testid New transform ${name}`,
    transformationEditor: (name: string) => `data-testid Transformation editor ${name}`,
    transformationEditorDebugger: (name: string) => `data-testid Transformation editor debugger ${name}`,
  },
  Transforms: {
    card: (name: string) => `data-testid New transform ${name}`,
    Reduce: {
      modeLabel: 'data-testid Transform mode label',
      calculationsLabel: 'data-testid Transform calculations label',
    },
    SpatialOperations: {
      actionLabel: 'root Action field property editor',
      locationLabel: 'root Location Mode field property editor',
      location: {
        autoOption: 'Auto location option',
        coords: {
          option: 'Coords location option',
          latitudeFieldLabel: 'root Latitude field field property editor',
          longitudeFieldLabel: 'root Longitude field field property editor',
        },
        geohash: {
          option: 'Geohash location option',
          geohashFieldLabel: 'root Geohash field field property editor',
        },
        lookup: {
          option: 'Lookup location option',
          lookupFieldLabel: 'root Lookup field field property editor',
          gazetteerFieldLabel: 'root Gazetteer field property editor',
        },
      },
    },
    searchInput: 'data-testid search transformations',
    noTransformationsMessage: 'data-testid no transformations message',
    addTransformationButton: 'data-testid add transformation button',
  },
  NavBar: {
    Configuration: {
      button: 'Configuration',
    },
    Toggle: {
      button: 'data-testid Toggle menu',
    },
    Reporting: {
      button: 'Reporting',
    },
  },
  NavMenu: {
    Menu: 'data-testid navigation mega-menu',
    item: 'data-testid Nav menu item',
  },
  NavToolbar: {
    container: 'data-testid Nav toolbar',
  },
  PageToolbar: {
    container: () => '.page-toolbar',
    item: (tooltip: string) => `${tooltip}`,
    itemButton: (title: string) => `data-testid ${title}`,
  },
  QueryEditorToolbarItem: {
    button: (title: string) => `QueryEditor toolbar item button ${title}`,
  },
  BackButton: {
    backArrow: 'data-testid Go Back',
  },
  OptionsGroup: {
    group: (title?: string) => (title ? `Options group ${title}` : 'Options group'),
    toggle: (title?: string) => (title ? `Options group ${title} toggle` : 'Options group toggle'),
  },
  PluginVisualization: {
    item: (title: string) => `Plugin visualization item ${title}`,
    current: () => '[class*="-currentVisualizationItem"]',
  },
  Select: {
    option: 'Select option',
    input: () => 'input[id*="time-options-input"]',
    singleValue: () => 'div[class*="-singleValue"]',
  },
  FieldConfigEditor: {
    content: 'Field config editor content',
  },
  OverridesConfigEditor: {
    content: 'Field overrides editor content',
  },
  FolderPicker: {
    /**
     * @deprecated use containerV2 from Grafana 8.3 instead
     */
    container: 'Folder picker select container',
    containerV2: 'data-testid Folder picker select container',
    input: 'Select a folder',
  },
  ReadonlyFolderPicker: {
    container: 'data-testid Readonly folder picker select container',
  },
  DataSourcePicker: {
    container: 'data-testid Data source picker select container',
    /**
     * @deprecated use inputV2 instead
     */
    input: () => 'input[id="data-source-picker"]',
    inputV2: 'data-testid Select a data source',
  },
  TimeZonePicker: {
    /**
     * @deprecated use TimeZonePicker.containerV2 from Grafana 8.3 instead
     */
    container: 'Time zone picker select container',
    containerV2: 'data-testid Time zone picker select container',
  },
  WeekStartPicker: {
    /**
     * @deprecated use WeekStartPicker.containerV2 from Grafana 8.3 instead
     */
    container: 'Choose starting day of the week',
    containerV2: 'data-testid Choose starting day of the week',
    placeholder: 'Choose starting day of the week',
  },
  TraceViewer: {
    spanBar: 'data-testid SpanBar--wrapper',
  },
  QueryField: { container: 'data-testid Query field' },
  QueryBuilder: {
    queryPatterns: 'data-testid Query patterns',
    labelSelect: 'data-testid Select label',
    valueSelect: 'data-testid Select value',
    matchOperatorSelect: 'data-testid Select match operator',
  },
  ValuePicker: {
    button: (name: string) => `data-testid Value picker button ${name}`,
    select: (name: string) => `data-testid Value picker select ${name}`,
  },
  Search: {
    /**
     * @deprecated use sectionV2 from Grafana 8.3 instead
     */
    section: 'Search section',
    sectionV2: 'data-testid Search section',
    /**
     * @deprecated use itemsV2 from Grafana 8.3 instead
     */
    items: 'Search items',
    itemsV2: 'data-testid Search items',
    cards: 'data-testid Search cards',
    collapseFolder: (sectionId: string) => `data-testid Collapse folder ${sectionId}`,
    expandFolder: (sectionId: string) => `data-testid Expand folder ${sectionId}`,
    dashboardItem: (item: string) => `${Components.Search.dashboardItems} ${item}`,
    dashboardCard: (item: string) => `data-testid Search card ${item}`,
    folderHeader: (folderName: string) => `data-testid Folder header ${folderName}`,
    folderContent: (folderName: string) => `data-testid Folder content ${folderName}`,
    dashboardItems: 'data-testid Dashboard search item',
  },
  DashboardLinks: {
    container: 'data-testid Dashboard link container',
    dropDown: 'data-testid Dashboard link dropdown',
    link: 'data-testid Dashboard link',
  },
  LoadingIndicator: {
    icon: 'Loading indicator',
  },
  CallToActionCard: {
    /**
     * @deprecated use buttonV2 from Grafana 8.3 instead
     */
    button: (name: string) => `Call to action button ${name}`,
    buttonV2: (name: string) => `data-testid Call to action button ${name}`,
  },
  DataLinksContextMenu: {
    singleLink: 'data-testid Data link',
  },
  CodeEditor: {
    container: 'data-testid Code editor container',
  },
  DashboardImportPage: {
    textarea: 'data-testid-import-dashboard-textarea',
    submit: 'data-testid-load-dashboard',
  },
  ImportDashboardForm: {
    name: 'data-testid-import-dashboard-title',
    submit: 'data-testid-import-dashboard-submit',
  },
  PanelAlertTabContent: {
    content: 'data-testid Unified alert editor tab content',
  },
  VisualizationPreview: {
    card: (name: string) => `data-testid suggestion-${name}`,
  },
  ColorSwatch: {
    name: `data-testid-colorswatch`,
  },
  DashboardRow: {
    title: (title: string) => `data-testid dashboard-row-title-${title}`,
  },
  UserProfile: {
    profileSaveButton: 'data-testid-user-profile-save',
    preferencesSaveButton: 'data-testid-shared-prefs-save',
    orgsTable: 'data-testid-user-orgs-table',
    sessionsTable: 'data-testid-user-sessions-table',
    extensionPointTabs: 'data-testid-extension-point-tabs',
    extensionPointTab: (tabId: string) => `data-testid-extension-point-tab-${tabId}`,
  },
  FileUpload: {
    inputField: 'data-testid-file-upload-input-field',
    fileNameSpan: 'data-testid-file-upload-file-name',
  },
  DebugOverlay: {
    wrapper: 'debug-overlay',
  },
  OrgRolePicker: {
    input: 'Role',
  },
  AnalyticsToolbarButton: {
    button: 'Dashboard insights',
  },
  Variables: {
    variableOption: 'data-testid variable-option',
  },
  Annotations: {
    annotationsTypeInput: 'annotations-type-input',
    annotationsChoosePanelInput: 'choose-panels-input',
  },
  Tooltip: {
    container: 'data-testid tooltip',
  },
};
