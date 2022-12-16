export type TheShareProg = {
  version: '0.1.0'
  name: 'the_share_prog'
  instructions: [
    {
      name: 'createPlan'
      accounts: [
        {
          name: 'planer'
          isMut: true
          isSigner: true
        },
        {
          name: 'plan'
          isMut: true
          isSigner: true
        },
        {
          name: 'token'
          isMut: false
          isSigner: false
        },
        {
          name: 'ataPlaner'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasurer'
          isMut: false
          isSigner: false
        },
        {
          name: 'treasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'fund'
          type: 'u64'
        },
        {
          name: 'planName'
          type: 'string'
        },
        {
          name: 'withdrawerList'
          type: {
            vec: 'publicKey'
          }
        },
      ]
    },
    {
      name: 'changePlanConfigs'
      accounts: [
        {
          name: 'planer'
          isMut: true
          isSigner: true
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'ataPlaner'
          isMut: true
          isSigner: false
        },
        {
          name: 'treasury'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'fund'
          type: 'u64'
        },
        {
          name: 'planName'
          type: 'string'
        },
        {
          name: 'withdrawerList'
          type: {
            vec: 'publicKey'
          }
        },
      ]
    },
    {
      name: 'createRequest'
      accounts: [
        {
          name: 'withdrawer'
          isMut: true
          isSigner: true
        },
        {
          name: 'request'
          isMut: true
          isSigner: true
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'reason'
          type: 'string'
        },
      ]
    },
    {
      name: 'changeRequest'
      accounts: [
        {
          name: 'withdrawer'
          isMut: true
          isSigner: true
        },
        {
          name: 'request'
          isMut: true
          isSigner: false
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'reason'
          type: 'string'
        },
      ]
    },
    {
      name: 'acceptRequest'
      accounts: [
        {
          name: 'planer'
          isMut: true
          isSigner: true
        },
        {
          name: 'request'
          isMut: true
          isSigner: false
        },
        {
          name: 'ataPlaner'
          isMut: true
          isSigner: false
        },
        {
          name: 'ataRequester'
          isMut: true
          isSigner: false
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'rejectRequest'
      accounts: [
        {
          name: 'planer'
          isMut: true
          isSigner: true
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'request'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'cancelRequest'
      accounts: [
        {
          name: 'withdrawer'
          isMut: true
          isSigner: true
        },
        {
          name: 'request'
          isMut: true
          isSigner: false
        },
        {
          name: 'plan'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: 'plan'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'planer'
            type: 'publicKey'
          },
          {
            name: 'planName'
            type: 'string'
          },
          {
            name: 'withdrawerList'
            type: {
              vec: 'publicKey'
            }
          },
          {
            name: 'fund'
            type: 'u64'
          },
          {
            name: 'token'
            type: 'publicKey'
          },
        ]
      }
    },
    {
      name: 'request'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'withdrawer'
            type: 'publicKey'
          },
          {
            name: 'plan'
            type: 'publicKey'
          },
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'state'
            type: {
              defined: 'RequestState'
            }
          },
          {
            name: 'reason'
            type: 'string'
          },
          {
            name: 'time'
            type: 'i64'
          },
        ]
      }
    },
  ]
  types: [
    {
      name: 'RequestState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Initialized'
          },
          {
            name: 'Confirmed'
          },
          {
            name: 'Rejected'
          },
          {
            name: 'Canceled'
          },
        ]
      }
    },
  ]
  events: [
    {
      name: 'AcceptRequestEvent'
      fields: [
        {
          name: 'withdrawer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: 'u64'
          index: false
        },
        {
          name: 'reason'
          type: 'string'
          index: false
        },
        {
          name: 'time'
          type: 'i64'
          index: false
        },
      ]
    },
    {
      name: 'CancelRequestEvent'
      fields: [
        {
          name: 'withdrawer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'plan'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: 'u64'
          index: false
        },
        {
          name: 'reason'
          type: 'string'
          index: false
        },
        {
          name: 'time'
          type: 'i64'
          index: false
        },
      ]
    },
    {
      name: 'ChangePlanConfigsEvent'
      fields: [
        {
          name: 'planer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'planName'
          type: 'string'
          index: false
        },
        {
          name: 'fund'
          type: 'u64'
          index: false
        },
        {
          name: 'token'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'ChangeRequestEvent'
      fields: [
        {
          name: 'withdrawer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'plan'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: 'u64'
          index: false
        },
        {
          name: 'reason'
          type: 'string'
          index: false
        },
        {
          name: 'time'
          type: 'i64'
          index: false
        },
      ]
    },
    {
      name: 'CreatePlanEvent'
      fields: [
        {
          name: 'planer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'planName'
          type: 'string'
          index: false
        },
        {
          name: 'fund'
          type: 'u64'
          index: false
        },
        {
          name: 'token'
          type: 'publicKey'
          index: false
        },
      ]
    },
    {
      name: 'CreateRequestEvent'
      fields: [
        {
          name: 'withdrawer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'plan'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: 'u64'
          index: false
        },
        {
          name: 'reason'
          type: 'string'
          index: false
        },
        {
          name: 'time'
          type: 'i64'
          index: false
        },
      ]
    },
    {
      name: 'RejectRequestEvent'
      fields: [
        {
          name: 'withdrawer'
          type: 'publicKey'
          index: false
        },
        {
          name: 'plan'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: 'u64'
          index: false
        },
        {
          name: 'reason'
          type: 'string'
          index: false
        },
      ]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'Overflow'
      msg: 'Operation overflowed'
    },
    {
      code: 6001
      name: 'InvalidAmount'
      msg: 'Invalid amount'
    },
    {
      code: 6002
      name: 'NoBump'
      msg: 'Cannot find treasurer account'
    },
    {
      code: 6003
      name: 'InvalidAuthorization'
      msg: 'Invalid Authorization'
    },
  ]
}

export const IDL: TheShareProg = {
  version: '0.1.0',
  name: 'the_share_prog',
  instructions: [
    {
      name: 'createPlan',
      accounts: [
        {
          name: 'planer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'token',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'ataPlaner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasurer',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'fund',
          type: 'u64',
        },
        {
          name: 'planName',
          type: 'string',
        },
        {
          name: 'withdrawerList',
          type: {
            vec: 'publicKey',
          },
        },
      ],
    },
    {
      name: 'changePlanConfigs',
      accounts: [
        {
          name: 'planer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ataPlaner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasury',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'fund',
          type: 'u64',
        },
        {
          name: 'planName',
          type: 'string',
        },
        {
          name: 'withdrawerList',
          type: {
            vec: 'publicKey',
          },
        },
      ],
    },
    {
      name: 'createRequest',
      accounts: [
        {
          name: 'withdrawer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'reason',
          type: 'string',
        },
      ],
    },
    {
      name: 'changeRequest',
      accounts: [
        {
          name: 'withdrawer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'reason',
          type: 'string',
        },
      ],
    },
    {
      name: 'acceptRequest',
      accounts: [
        {
          name: 'planer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ataPlaner',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ataRequester',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'rejectRequest',
      accounts: [
        {
          name: 'planer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'cancelRequest',
      accounts: [
        {
          name: 'withdrawer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'request',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'plan',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'plan',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'planer',
            type: 'publicKey',
          },
          {
            name: 'planName',
            type: 'string',
          },
          {
            name: 'withdrawerList',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'fund',
            type: 'u64',
          },
          {
            name: 'token',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'request',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'withdrawer',
            type: 'publicKey',
          },
          {
            name: 'plan',
            type: 'publicKey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'state',
            type: {
              defined: 'RequestState',
            },
          },
          {
            name: 'reason',
            type: 'string',
          },
          {
            name: 'time',
            type: 'i64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'RequestState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Initialized',
          },
          {
            name: 'Confirmed',
          },
          {
            name: 'Rejected',
          },
          {
            name: 'Canceled',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'AcceptRequestEvent',
      fields: [
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reason',
          type: 'string',
          index: false,
        },
        {
          name: 'time',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'CancelRequestEvent',
      fields: [
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'plan',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reason',
          type: 'string',
          index: false,
        },
        {
          name: 'time',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'ChangePlanConfigsEvent',
      fields: [
        {
          name: 'planer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'planName',
          type: 'string',
          index: false,
        },
        {
          name: 'fund',
          type: 'u64',
          index: false,
        },
        {
          name: 'token',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'ChangeRequestEvent',
      fields: [
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'plan',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reason',
          type: 'string',
          index: false,
        },
        {
          name: 'time',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'CreatePlanEvent',
      fields: [
        {
          name: 'planer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'planName',
          type: 'string',
          index: false,
        },
        {
          name: 'fund',
          type: 'u64',
          index: false,
        },
        {
          name: 'token',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'CreateRequestEvent',
      fields: [
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'plan',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reason',
          type: 'string',
          index: false,
        },
        {
          name: 'time',
          type: 'i64',
          index: false,
        },
      ],
    },
    {
      name: 'RejectRequestEvent',
      fields: [
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'plan',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reason',
          type: 'string',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Overflow',
      msg: 'Operation overflowed',
    },
    {
      code: 6001,
      name: 'InvalidAmount',
      msg: 'Invalid amount',
    },
    {
      code: 6002,
      name: 'NoBump',
      msg: 'Cannot find treasurer account',
    },
    {
      code: 6003,
      name: 'InvalidAuthorization',
      msg: 'Invalid Authorization',
    },
  ],
}
