import {
  stageConfiguration,
  customDisplaySelectors,
} from './viewportDataRoleConfiguration';

async function getConfigFileValues() {
  const configVal = await fetch(
    'http://localhost:6001/api/DicomWado/dataroleconfig'
  );
  return await configVal.json();
}

getConfigFileValues().then(configVal => {
  var totalViewports = stageConfiguration.viewports.length;
  var viewport;

  for (var index = 0; index < totalViewports; index++) {
    let dataRole;
    let displaySets;
    let seriesDescription;
    let displaySetId;
    let vpDisplaySets;
    let matchingRule;

    viewport = stageConfiguration.viewports[index];
    displaySets = viewport['displaySets'];

    if (displaySets.length > 0) {
      displaySetId = displaySets[0].id;
    }

    vpDisplaySets = customDisplaySelectors[displaySetId];
    matchingRule = vpDisplaySets['seriesMatchingRules'];
    if (matchingRule.length > 0) {
      var customAttribute = matchingRule[0]['attribute'];
    }

    if (customAttribute === 'dataRole') {
      dataRole = matchingRule[0]['constraint']['contains'];
    }

    var dynamicConfigVal = configVal.dataRoles.find(
      dataRoleVal => dataRoleVal.id === dataRole
    );

    if (dynamicConfigVal !== undefined) {
      seriesDescription = dynamicConfigVal.seriesDescription;
    }

    customDisplaySelectors[displaySetId]['seriesMatchingRules'] = [];

    let seriesMatchingRule = {};

    seriesMatchingRule['attribute'] = 'SeriesDescription';
    seriesMatchingRule['constraint'] = {};

    let constraintObj = {};
    constraintObj['contains'] = seriesDescription;
    seriesMatchingRule['constraint'] = constraintObj;
    seriesMatchingRule['required'] = true;

    customDisplaySelectors[displaySetId]['seriesMatchingRules'].push(
      seriesMatchingRule
    );
  }
  let defaultDisplaySet = {};
  defaultDisplaySet['seriesMatchingRules'] = [];
  let seriesMatchingRule = {};

  seriesMatchingRule['attribute'] = 'numImageFrames';
  seriesMatchingRule['constraint'] = {};

  let constraintObj = {};
  constraintObj['greaterThan'] = {};
  let greaterThanObj = {};
  greaterThanObj['value'] = 0;
  constraintObj['greaterThan'] = greaterThanObj;

  seriesMatchingRule['constraint'] = constraintObj;

  defaultDisplaySet['seriesMatchingRules'].push(seriesMatchingRule);

  customDisplaySelectors['defaultDisplaySetId'] = defaultDisplaySet;
});

getConfigFileValues();
export default customDisplaySelectors;
