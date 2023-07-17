import { stageConfiguration } from './viewportDataRoleConfiguration';
import customDisplaySelectors from './DisplaysetSelectionDataRoleConfiguration';
import hpMNGrid from './hpMNGrid';
const defaultProtocol = {
  id: 'default',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  hasUpdatedPriorsInformation: false,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
    },
    displaySets: [
      {
        id: 'vp_1DisplaySet',
        matchedDisplaySetsIndex: -1,
      },
    ],
  },
  displaySetSelectors: customDisplaySelectors,
  stages: [stageConfiguration],
};

function getHangingProtocolModule() {
  return [
    {
      name: defaultProtocol.id,
      protocol: defaultProtocol,
    },
    // Create a MxN hanging protocol available by default
    {
      name: hpMNGrid.id,
      protocol: hpMNGrid,
    },
  ];
}

export default getHangingProtocolModule;
