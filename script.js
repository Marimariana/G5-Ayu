/*
Simple Accessible Tab control v6.1.1 19-03-2017
Author: Mike Foskett
Incept: 09-03-2016
Article: http://websemantics.uk/articles/accessible-tab-navigation/
Furtherence of: Heydon Pickering - http://heydonworks.com/practical_aria_examples/#tab-interface

  Uses ARIA attributes (via CSS) to control what's visible.

  Requires (tested):
    addEventListener (IE8+)
    preventDefault (IE9+)
    classList (IE10+)
    querySelectorAll (IE9+)

  Required parameter:
    none

  Optional parameters:

    tabListClass : "tl_list" (default)

    onClass : "ON" (default)
            Customisable, set default tab on.
            Used for initialisation only.

    hoverableClass : "tl-hoverable" (default)
            Customisable, allow mouse-hover to switch tabs.
            Apply to the navigation ul.

  Version 6.1.1 - 19-03-2017 - Added: up/down arrow keys; nested tablists
  Version 6.1 - 16-08-2016
  Version 6 - 10-07-2016
  Version 5.2 - 17-03-2016
  Version 5 - 09-03-2016
  Version 4 - 27-01-2012
  Version 3 - 25-01-2012
  Version 1 - 27-05-2010
*/

var accessibleTabs6 = (function () {

  "use strict";

  var d = document;
  var tabListClass;
  var onClass;
  var hoverableClass;

  var setTabsOff = function (tabList) {
    var i = tabList.tabs.length;
    while (i--) {
      setTab(tabList.tabs[i], false);
    }
  };

  var setTab = function (tab, switchOn) {
    if (tab && tab.panelId) {
      d.getElementById(tab.panelId).setAttribute("aria-hidden", !switchOn);
      tab.setAttribute("aria-selected", switchOn);
      tab.setAttribute("tabindex", switchOn ? "0" : "-1");
    }
  };

  var _activateTab = function (e) {
    var tab = e.target;
    if (e.preventDefault) {
      e.preventDefault();
      setTabsOff(tab.tabList);
      setTab(tab, true);
      d.getElementById(tab.panelId).children[0].focus();
    }
  };

  var _keypressed = function (e) {

    var tab = e.target;
    var newNo = -1;
    var tabs = tab.tabList.tabs;
    var maxNo = tabs.length - 1;

    if (e.keyCode === 37 || e.keyCode === 38) { // left / up arrow
      newNo = (tab.no === 0) ? maxNo : tab.no - 1;
    }
    if (e.keyCode === 39 || e.keyCode === 40) { // right arrow / down arrow
      newNo = (tab.no === maxNo) ? 0 : tab.no + 1;
    }

    if (newNo > -1) {
      setTabsOff(tab.tabList);
      setTab(tabs[newNo], true);
      tabs[newNo].focus();
    }
  };

  var _tabHovered = function (e) {
    var a = e.target;
    var useHover = a.tabList.classList.contains(hoverableClass);
    if (useHover) {
      _activateTab(e);
    }
  };

  var _events = function (tab) {
    tab.addEventListener("click", _activateTab, false);
    tab.addEventListener("keydown", _keypressed, false);
    tab.addEventListener("mouseover", _tabHovered, false);
  };

  var _initialiseAriaAttributes = function (tab) {

    var tabPanel = d.getElementById(tab.panelId);

    tab.parentNode.setAttribute("role", "presentation");
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", tab.panelId);

    tabPanel.setAttribute("role", "tabpanel");
    tabPanel.setAttribute("aria-labelledby", tab.id);

    // Make first <section> object keyboard focussable
    // Preferably a heading
    // Tabindex=0 to work both forwards and backwards through the keychain
    tabPanel.children[0].setAttribute("tabindex", "0");

  };

  var _setUpConfig = function (cfg) {
    tabListClass = cfg.tabListClass || "tl_list";
    onClass = cfg.onClass || "ON";
    hoverableClass = cfg.hoverableClass || "tl-hoverable";
  };

  var _setUpTab = function (tab, panelId, count) {
    tab.no = count;
    tab.id = "tab-" + panelId;
    tab.panelId = panelId;
    _initialiseAriaAttributes(tab);
    _events(tab);
  };


  var _initialiseTabList = function (tabList) {

    var defaultTab = 0;
    var panelId;
    var tabPanel;
    var i;

    if (tabList) {

      tabList.setAttribute("role", "tablist");
      tabList.tabs = tabList.getElementsByTagName("a");
      i = tabList.tabs.length;

      while (i--) {

        tabList.tabs[i].tabList = tabList;

        panelId = tabList.tabs[i].href.slice(tabList.tabs[i].href.lastIndexOf("#") + 1);
        tabPanel = d.getElementById(panelId);

        if (tabPanel) {
          _setUpTab(tabList.tabs[i], panelId, i);
          if (tabList.tabs[i].classList.contains(onClass)) {
            defaultTab = i;

            // onClass only used to declare intial state, so remove from DOM
            tabList.tabs[i].classList.remove(onClass);
            d.getElementById(panelId).classList.remove(onClass);
          }
        }
      }
      setTabsOff(tabList);
      if (tabList.tabs[defaultTab] && tabList.tabs[defaultTab].panelId) {
        setTab(tabList.tabs[defaultTab], true);
      }
    }
  };

  var _isMustardCut = function (e) {
    // check browser feature support (IE10+)
    return (
      (typeof d.querySelectorAll === "function") &&
      d.addEventListener &&
      !!d.documentElement.classList // IE10+
    );
  };

  var init = function (cfg) {
    var tabLists;
    var i;

    if (_isMustardCut()) {
      _setUpConfig(cfg);
      tabLists = d.getElementsByClassName(tabListClass);
      i = tabLists.length;
      while (i--) {
        _initialiseTabList(tabLists[i]);
      }
    }
  };

  return {
    init: init
  };

}());


accessibleTabs6.init({
  tabListClass : "tl_list",   // default, may omit
  onClass : "ON",               // default, may omit
  hoverableClass : "tl-hoverable"  // default, may omit
});


/* Despues edito este gráfico*/

Highcharts.chart("container", {
  chart: {
    type: "column",
    zoomType: "y"
  },
  title: {
    text: " "
  },
  subtitle: {
    text: ' '
  },
  xAxis: {
    categories: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre"
    ],
    title: {
      text: null
    },
    accessibility: {
      description: "Mes"
    }
  },
  yAxis: {
    min: 0,
    tickInterval: 100,
    title: {
      text: "."
    },
    labels: {
      overflow: "justify",
      format: "{value}"
    }
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        format: "{y} pesos"
      }
    }
  },
  tooltip: {
    valueSuffix: " Pesos",
    stickOnContact: true,
    backgroundColor: "rgba(255, 255, 255, 0.93)"
  },
  legend: {
    enabled: false
  },
  series: [
    {
      name: "Ahorrado en el mes",
      data: [600, 630, 543, 440, 250, 231, 160, 100, 120, 230, 320],
      borderColor: "#5997DE"
    }
  ]
});

Highcharts.chart('container-pie', {
  colors: ['#6200EE', '#6D7072', '#FAA74B', '#B37CD2'],
  chart: {
    type: 'pie'
  },
  title: {
    text: ' '
  },
  tooltip: {
    valueSuffix: '%'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{point.name}: {y} %'
      },
      showInLegend: false
    }
  },
  series: [{
    name: 'Porcentaje',
    colorByPoint: true,
    innerSize: '75%',
    data: [{
      name: 'Ahorrado',
      y: 78
    }, {
      name: 'Faltan',
      y: 20.9
    }]
  }]
});

/* Section B*/
Highcharts.chart("container_b", {
  chart: {
    type: "column",
    zoomType: "y"
  },
  title: {
    text: " "
  },
  subtitle: {
    text: ' '
  },
  xAxis: {
    categories: [
      "Semana 1",
      "Semana 2",
      "Semana 3",
      "Semana 4"
    ],
    title: {
      text: null
    },
    accessibility: {
      description: "Semana"
    }
  },
  yAxis: {
    min: 0,
    tickInterval: 10,
    title: {
      text: "."
    },
    labels: {
      overflow: "justify",
      format: "{value}"
    }
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        format: "{y} pesos"
      }
    }
  },
  tooltip: {
    valueSuffix: " Pesos",
    stickOnContact: true,
    backgroundColor: "rgba(255, 255, 255, 0.93)"
  },
  legend: {
    enabled: false
  },
  series: [
    {
      name: "Ahorrado en el mes",
      data: [60, 60, 54, 44],
      borderColor: "#5997DE"
    }
  ]
});

Highcharts.chart('container-pie_b', {
  colors: ['#6200EE', '#6D7072', '#FAA74B', '#B37CD2'],
  chart: {
    type: 'pie'
  },
  title: {
    text: ' '
  },
  tooltip: {
    valueSuffix: '%'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{point.name}: {y} %'
      },
      showInLegend: false
    }
  },
  series: [{
    name: 'Porcentaje',
    colorByPoint: true,
    innerSize: '75%',
    data: [{
      name: 'Ahorrado',
      y: 60
    }, {
      name: 'Falto',
      y: 30
    }]
  }]
});


/*Section C*/
Highcharts.chart("container_c", {
  chart: {
    type: "column",
    zoomType: "y"
  },
  title: {
    text: " "
  },
  subtitle: {
    text: ' '
  },
  xAxis: {
    categories: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo"
    ],
    title: {
      text: null
    },
    accessibility: {
      description: "Día"
    }
  },
  yAxis: {
    min: 0,
    tickInterval: 10,
    title: {
      text: "."
    },
    labels: {
      overflow: "justify",
      format: "{value}"
    }
  },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        format: "{y} pesos"
      }
    }
  },
  tooltip: {
    valueSuffix: " Pesos",
    stickOnContact: true,
    backgroundColor: "rgba(255, 255, 255, 0.93)"
  },
  legend: {
    enabled: false
  },
  series: [
    {
      name: "Ahorrado en el mes",
      data: [60, 60, 43, 40, 20, 31, 16],
      borderColor: "#5997DE",
      fill:"#5997DE",
      backgroundColor: "#5997DE"
    }
  ]
});

Highcharts.chart('container-pie_c', {
  colors: ['#6200EE', '#6D7072', '#FAA74B', '#B37CD2'],
  chart: {
    type: 'pie'
  },
  title: {
    text: ' '
  },
  tooltip: {
    valueSuffix: '%'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{point.name}: {y} %'
      },
      showInLegend: false
    }
  },
  series: [{
    name: 'Porcentaje',
    colorByPoint: true,
    innerSize: '75%',
    data: [{
      name: 'Ahorrado',
      y: 55
    }, {
      name: 'Faltan',
      y: 45
    }]
  }]
});