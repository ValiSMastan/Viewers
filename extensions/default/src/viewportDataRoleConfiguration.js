import configuration from '../../../staticConfiguration.json';
const layout = configuration.hangingType;
const totalViewports = configuration.viewports.length;

let rows = Number(layout.charAt(0));
let columns = Number(layout.charAt(2));

var stageConfiguration = {};

stageConfiguration['name'] = layout;

stageConfiguration['viewportStructure'] = {};

stageConfiguration['viewportStructure']['layoutType'] = 'grid';

stageConfiguration['viewportStructure']['properties'] = {};
stageConfiguration['viewportStructure']['properties']['rows'] = rows;
stageConfiguration['viewportStructure']['properties']['columns'] = columns;

stageConfiguration['viewports'] = [];

for (let index = 0; index < totalViewports; index++) {
  let viewport = {};

  viewport['viewportOptions'] = {};
  if (index !== totalViewports) {
    viewport['viewportOptions']['toolGroupId'] = 'default';
  }

  let viewportNumber = index + 1;
  let viewportFromConfig = configuration.viewports.find(
    viewport => Number(viewport.viewportNumber) === viewportNumber
  );

  let viewportType = viewportFromConfig.viewportType;
  if (viewportType.length !== 0) {
    viewport['viewportOptions']['viewportType'] = viewportType;
  }
  viewport['displaySets'] = [];

  let displaySet = {};
  displaySet['id'] = `vp_${index + 1}DisplaySet`;

  viewport['displaySets'].push(displaySet);

  stageConfiguration['viewports'].push(viewport);
}

let customDisplaySelectors = {};
for (let index = 0; index < totalViewports; index++) {
  let vpDisplaySet = {};
  vpDisplaySet['seriesMatchingRules'] = [];

  let dataRoleMatchingRule = {};

  dataRoleMatchingRule['attribute'] = 'dataRole';
  dataRoleMatchingRule['constraint'] = {};

  let dataRoleConstraintObj = {};
  let viewportNumber = index + 1;
  let viewportFromConfig = configuration.viewports.find(
    viewport => Number(viewport.viewportNumber) === viewportNumber
  );
  if (viewportFromConfig) {
    dataRoleConstraintObj['contains'] = viewportFromConfig.dataRole;
    dataRoleMatchingRule['constraint'] = dataRoleConstraintObj;
    dataRoleMatchingRule['required'] = false;

    vpDisplaySet['seriesMatchingRules'].push(dataRoleMatchingRule);

    customDisplaySelectors[`vp_${index + 1}DisplaySet`] = vpDisplaySet;
  }
}

export { stageConfiguration, customDisplaySelectors };
