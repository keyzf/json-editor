import * as React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'antd';
import JSONSchemaEditor from '@wibetter/json-schema-editor/dist/index.umd';
import JSONEditor from './main';
import '@wibetter/json-schema-editor/dist/index.css';
import './index.scss';

/**
 * JSONEditor的测试Demo
 */
class IndexDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jsonSchema0: {
        type: 'object',
        title: '单位计量输入',
        format: 'quantity',
        isRequired: false,
        default: '',
        description: '',
        placeholder: '',
        readOnly: false,
        properties: {
          unit: { type: 'number', title: '数值', format: 'number' },
          quantity: {
            type: 'string',
            default: 'px',
            format: 'typeSelect',
            enum: ['px', 'rem', 'em', '%'],
            enumextra: ['px', 'rem', 'em', '%'],
            title: '单位类型',
          },
        },
        required: ['unit', 'quantity'],
        propertyOrder: ['unit', 'quantity'],
      }, // 通用schema类型-计量单位类型 显示  / update ok
      jsonSchema1: {
        type: 'object',
        title: '对象类型',
        format: 'object',
        isRequired: false,
        default: '',
        description: '',
        placeholder: '',
        readOnly: false,
        properties: {
          a: {
            type: 'string',
            title: '单文本框',
            format: 'input',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_2: {
            type: 'string',
            title: '单文本框',
            format: 'input',
            default: '',
            description: '',
            placeholder: '',
            isRequired: false,
            readOnly: false,
          },
          field_3: {
            type: 'string',
            title: '单文本框',
            format: 'input',
            default: '',
            description: '',
            placeholder: '',
            isRequired: false,
            readOnly: false,
          },
        },
        required: ['a', 'field_2', 'field_3'],
        propertyOrder: ['a', 'field_2', 'field_3'],
      }, // 通用schema类型-对象类型 显示  / update ok
      jsonSchema2: {
        type: 'array',
        title: '数组',
        format: 'array',
        isRequired: false,
        default: '',
        description: '',
        placeholder: '',
        readOnly: false,
        items: {
          type: 'object',
          format: 'object',
          title: '数组项',
          readOnly: false,
          isRequired: false,
          description: '',
          properties: {
            name: {
              type: 'string',
              format: 'input',
              title: '名字',
              isRequired: false,
              default: '',
              description: '',
              placeholder: '',
              readOnly: false,
            },
            field_1: {
              type: 'string',
              title: '单文本框',
              format: 'input',
              default: '',
              description: '',
              placeholder: '',
              isRequired: false,
              readOnly: false,
            },
          },
          required: ['name', 'field_1'],
          propertyOrder: ['name', 'field_1'],
        },
      }, // 通用schema类型-数组类型 显示  / update ok
      jsonSchema3: {
        type: 'object',
        title: '数据源',
        format: 'datasource',
        isRequired: false,
        default: '',
        description: '',
        placeholder: '',
        readOnly: false,
        properties: {
          type: {
            type: 'string',
            default: 'local',
            format: 'typeSelect',
            enum: ['local', 'remote'],
            enumextra: ['local', 'remote'],
            title: '数据源类型',
          },
          data: {
            type: 'string',
            format: 'json',
            default: 'local',
            readOnlyInJson: false,
            title: '本地静态json数据',
          },
          filter: {
            type: 'string',
            format: 'codearea',
            default: 'return data;',
            title: '过滤器',
          },
        },
        required: ['type', 'data', 'filter'],
        propertyOrder: ['type', 'data', 'filter'],
      }, // 通用schema类型-datasource类型 显示  / update ok
      jsonSchema4: {
        type: 'object',
        format: 'event',
        title: '事件',
        isRequired: false,
        readOnly: false,
        properties: {
          type: {
            type: 'string',
            default: 'emit',
            format: 'typeSelect',
            enum: ['on', 'emit'],
            enumextra: ['on', 'emit'],
            title: '事件类型',
            isRequired: false,
            readOnly: false,
          },
          trigger: {
            type: 'string',
            format: 'input',
            default: 'eventName',
            title: '触发事件',
            description: '用于输入触发事件的名称',
            placeholder: '请输入触发事件的名称',
            isRequired: false,
            readOnly: false,
          },
          eventData: {
            type: 'string',
            title: '事件数据',
            format: 'json',
            default: '{}',
            description: '传递给触发事件的数据对象',
            isRequired: false,
            readOnly: false,
          },
        },
        required: ['type', 'trigger', 'eventData'],
        propertyOrder: ['type', 'trigger', 'eventData'],
      }, // 通用schema类型-事件类型 显示  / update ok
      jsonSchema5: {
        type: 'object',
        format: 'func',
        title: '功能设置',
        readOnly: false,
        properties: {
          field_1: {
            type: 'string',
            title: '单文本框',
            format: 'input',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_2: {
            type: 'boolean',
            title: '布尔值',
            format: 'boolean',
            isRequired: false,
            default: true,
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_3: {
            type: 'string',
            title: '日期',
            format: 'date',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_4: {
            type: 'string',
            title: '日期',
            format: 'date-time',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_5: {
            type: 'string',
            title: '时间',
            format: 'time',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_6: {
            type: 'string',
            title: 'URL',
            format: 'url',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_7: {
            type: 'string',
            title: '多行文本框',
            format: 'textarea',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
          },
          field_8: {
            type: 'number',
            title: '数值',
            format: 'number',
            isRequired: false,
            default: 50,
            description: '',
            placeholder: '',
            readOnly: false,
            minimum: 0,
            maximum: 100,
          },
          field_9: {
            type: 'string',
            title: '单选',
            format: 'radio',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumextra: ['选项a', '选项b', '选项c'],
              format: 'string',
            },
          },
          field_10: {
            type: 'array',
            title: '多选',
            format: 'select',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'string',
              enum: ['a', 'b', 'c'],
              enumextra: ['选项a', '选项b', '选项c'],
              format: 'string',
            },
          },
          field_11: {
            type: 'array',
            title: '数组',
            format: 'array',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            items: {
              type: 'object',
              format: 'object',
              title: '数组项',
              readOnly: false,
              isRequired: false,
              description: '',
              properties: {
                name: {
                  type: 'string',
                  format: 'input',
                  title: '名字',
                  isRequired: false,
                  default: '',
                  description: '',
                  placeholder: '',
                  readOnly: false,
                },
                field_1: {
                  type: 'string',
                  title: '单文本框',
                  format: 'input',
                  default: '',
                  description: '',
                  placeholder: '',
                  isRequired: false,
                  readOnly: false,
                },
              },
              required: ['name', 'field_1'],
              propertyOrder: ['name', 'field_1'],
            },
          },
          field_12: {
            type: 'object',
            title: '对象类型',
            format: 'object',
            isRequired: false,
            default: '',
            description: '',
            placeholder: '',
            readOnly: false,
            properties: {
              a: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_2: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                default: '',
                description: '',
                placeholder: '',
                isRequired: false,
                readOnly: false,
              },
              field_3: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                default: '',
                description: '',
                placeholder: '',
                isRequired: false,
                readOnly: false,
              },
            },
            required: ['a', 'field_2', 'field_3'],
            propertyOrder: ['a', 'field_2', 'field_3'],
          },
        },
        required: [
          'field_1',
          'field_2',
          'field_3',
          'field_4',
          'field_5',
          'field_6',
          'field_7',
          'field_8',
          'field_9',
          'field_10',
          'field_11',
          'field_12',
        ],
        propertyOrder: [
          'field_1',
          'field_2',
          'field_3',
          'field_4',
          'field_5',
          'field_6',
          'field_7',
          'field_8',
          'field_9',
          'field_10',
          'field_11',
          'field_12',
        ],
      }, // 通用schema类型 显示  / update ok
      jsonSchema: {
        type: 'object',
        title: 'jsonSchemaObject',
        properties: {
          func: {
            type: 'object',
            format: 'func',
            title: '功能设置',
            readOnly: false,
            properties: {
              field_1: {
                type: 'string',
                title: '单文本框',
                format: 'input',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_2: {
                type: 'boolean',
                title: '布尔值',
                format: 'boolean',
                isRequired: false,
                default: true,
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_3: {
                type: 'string',
                title: '日期',
                format: 'date',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_4: {
                type: 'string',
                title: '日期',
                format: 'date-time',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_5: {
                type: 'string',
                title: '时间',
                format: 'time',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_6: {
                type: 'string',
                title: 'URL',
                format: 'url',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_7: {
                type: 'string',
                title: '多行文本框',
                format: 'textarea',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_8: {
                type: 'number',
                title: '数值',
                format: 'number',
                isRequired: false,
                default: 50,
                description: '',
                placeholder: '',
                readOnly: false,
                minimum: 0,
                maximum: 100,
              },
              field_9: {
                type: 'string',
                title: '单选',
                format: 'radio',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                items: {
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumextra: ['选项a', '选项b', '选项c'],
                  format: 'string',
                },
              },
              field_10: {
                type: 'array',
                title: '多选',
                format: 'select',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                items: {
                  type: 'string',
                  enum: ['a', 'b', 'c'],
                  enumextra: ['选项a', '选项b', '选项c'],
                  format: 'string',
                },
              },
              field_11: {
                type: 'array',
                title: '数组',
                format: 'array',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                items: {
                  type: 'object',
                  format: 'object',
                  title: '数组项',
                  readOnly: false,
                  isRequired: false,
                  description: '',
                  properties: {
                    name: {
                      type: 'string',
                      format: 'input',
                      title: '名字',
                      isRequired: false,
                      default: '',
                      description: '',
                      placeholder: '',
                      readOnly: false,
                    },
                    field_1: {
                      type: 'string',
                      title: '单文本框',
                      format: 'input',
                      default: '',
                      description: '',
                      placeholder: '',
                      isRequired: false,
                      readOnly: false,
                    },
                  },
                  required: ['name', 'field_1'],
                  propertyOrder: ['name', 'field_1'],
                },
              },
              field_12: {
                type: 'object',
                title: '对象类型',
                format: 'object',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                properties: {
                  a: {
                    type: 'string',
                    title: '单文本框',
                    format: 'input',
                    isRequired: false,
                    default: '',
                    description: '',
                    placeholder: '',
                    readOnly: false,
                  },
                  field_2: {
                    type: 'string',
                    title: '单文本框',
                    format: 'input',
                    default: '',
                    description: '',
                    placeholder: '',
                    isRequired: false,
                    readOnly: false,
                  },
                  field_3: {
                    type: 'string',
                    title: '单文本框',
                    format: 'input',
                    default: '',
                    description: '',
                    placeholder: '',
                    isRequired: false,
                    readOnly: false,
                  },
                },
                required: ['a', 'field_2', 'field_3'],
                propertyOrder: ['a', 'field_2', 'field_3'],
              },
            },
            required: [
              'field_1',
              'field_2',
              'field_3',
              'field_4',
              'field_5',
              'field_6',
              'field_7',
              'field_8',
              'field_9',
              'field_10',
              'field_11',
              'field_12',
            ],
            propertyOrder: [
              'field_1',
              'field_2',
              'field_3',
              'field_4',
              'field_5',
              'field_6',
              'field_7',
              'field_8',
              'field_9',
              'field_10',
              'field_11',
              'field_12',
            ],
          },
          style: {
            type: 'object',
            format: 'style',
            title: '样式设置',
            readOnly: false,
            properties: {
              field_18: {
                type: 'string',
                title: '颜色值',
                format: 'color',
                isRequired: false,
                default: '#fff',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_23: {
                type: 'object',
                title: '单位计量输入',
                format: 'quantity',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                properties: {
                  unit: { type: 'number', title: '数值', format: 'number' },
                  quantity: {
                    type: 'string',
                    default: 'px',
                    format: 'typeSelect',
                    enum: ['px', 'rem', 'em', '%'],
                    enumextra: ['px', 'rem', 'em', '%'],
                    title: '单位类型',
                  },
                },
                required: ['unit', 'quantity'],
                propertyOrder: ['unit', 'quantity'],
              },
              field_1: {
                type: 'string',
                title: '富文本类型',
                format: 'htmlarea',
                placeholder: '请输入html代码片段',
                default: '<p>hello,world!</p>',
                description: '用于放置html代码片段',
                isRequired: false,
                readOnly: false,
              },
            },
            required: ['field_18', 'field_23', 'field_1'],
            propertyOrder: ['field_18', 'field_23', 'field_1'],
          },
          data: {
            type: 'object',
            format: 'data',
            title: '数据设置',
            readOnly: false,
            properties: {
              field_28: {
                type: 'string',
                title: 'json数据项',
                format: 'json',
                isRequired: false,
                default: '{}',
                description: '',
                placeholder: '',
                readOnly: false,
              },
              field_29: {
                type: 'object',
                title: '数据源',
                format: 'datasource',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                properties: {
                  type: {
                    type: 'string',
                    default: 'local',
                    format: 'typeSelect',
                    enum: ['local', 'remote'],
                    enumextra: ['local', 'remote'],
                    title: '数据源类型',
                  },
                  data: {
                    type: 'string',
                    format: 'json',
                    default: 'local',
                    readOnlyInJson: false,
                    title: '本地静态json数据',
                  },
                  filter: {
                    type: 'string',
                    format: 'codearea',
                    default: 'return data;',
                    title: '过滤器',
                  },
                },
                required: ['type', 'data', 'filter'],
                propertyOrder: ['type', 'data', 'filter'],
              },
              field_30: {
                type: 'object',
                format: 'event',
                title: '事件',
                isRequired: false,
                readOnly: false,
                properties: {
                  type: {
                    type: 'string',
                    default: 'emit',
                    format: 'typeSelect',
                    enum: ['on', 'emit'],
                    enumextra: ['on', 'emit'],
                    title: '事件类型',
                    isRequired: false,
                    readOnly: false,
                  },
                  trigger: {
                    type: 'string',
                    format: 'input',
                    default: 'eventName',
                    title: '触发事件',
                    description: '用于输入触发事件的名称',
                    placeholder: '请输入触发事件的名称',
                    isRequired: false,
                    readOnly: false,
                  },
                  eventData: {
                    type: 'string',
                    title: '事件数据',
                    format: 'json',
                    default: '{}',
                    description: '传递给触发事件的数据对象',
                    isRequired: false,
                    readOnly: false,
                  },
                },
                required: ['type', 'trigger', 'eventData'],
                propertyOrder: ['type', 'trigger', 'eventData'],
              },
              field_33: {
                type: 'array',
                title: '数组',
                format: 'array',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                items: {
                  type: 'object',
                  format: 'object',
                  title: '数组项',
                  readOnly: false,
                  isRequired: false,
                  description: '',
                  properties: {
                    name: {
                      type: 'string',
                      format: 'input',
                      title: '名字',
                      isRequired: false,
                      default: '',
                      description: '',
                      placeholder: '',
                      readOnly: false,
                    },
                    field_2: {
                      type: 'array',
                      title: '数组',
                      format: 'array',
                      isRequired: false,
                      default: '',
                      description: '',
                      placeholder: '',
                      readOnly: false,
                      items: {
                        type: 'object',
                        format: 'object',
                        title: '数组项',
                        readOnly: false,
                        isRequired: false,
                        description: '',
                        properties: {
                          name: {
                            type: 'string',
                            format: 'input',
                            title: '名字',
                            isRequired: false,
                            default: '',
                            description: '',
                            placeholder: '',
                            readOnly: false,
                          },
                          field_3: {
                            type: 'string',
                            title: '单文本框',
                            format: 'input',
                            isRequired: false,
                            default: '',
                            description: '',
                            placeholder: '',
                            readOnly: false,
                          },
                          field_5: {
                            type: 'string',
                            title: '单文本框',
                            format: 'input',
                            isRequired: false,
                            default: '',
                            description: '',
                            placeholder: '',
                            readOnly: false,
                          },
                        },
                        required: ['name', 'field_3', 'field_5'],
                        propertyOrder: ['name', 'field_3', 'field_5'],
                      },
                    },
                  },
                  required: ['name', 'field_2'],
                  propertyOrder: ['name', 'field_2'],
                },
                properties: {
                  a: {
                    type: 'string',
                    title: '单文本框',
                    format: 'input',
                    isRequired: false,
                    default: '',
                    description: '',
                    placeholder: '',
                    readOnly: false,
                  },
                },
                required: ['a'],
                propertyOrder: ['a'],
              },
              field_34: {
                type: 'object',
                title: '对象类型',
                format: 'object',
                isRequired: false,
                default: '',
                description: '',
                placeholder: '',
                readOnly: false,
                properties: {
                  obj: {
                    type: 'object',
                    title: '对象类型',
                    format: 'object',
                    isRequired: false,
                    default: '',
                    description: '',
                    placeholder: '',
                    readOnly: false,
                    properties: {
                      a: {
                        type: 'string',
                        title: '单文本框',
                        format: 'input',
                        isRequired: false,
                        default: '',
                        description: '',
                        placeholder: '',
                        readOnly: false,
                      },
                      field_1: {
                        type: 'array',
                        title: '多选',
                        format: 'select',
                        isRequired: false,
                        default: '',
                        description: '',
                        placeholder: '',
                        readOnly: false,
                        items: {
                          type: 'string',
                          enum: ['a', 'b', 'c'],
                          enumextra: ['选项a', '选项b', '选项c'],
                          format: 'string',
                        },
                      },
                    },
                    required: ['a', 'field_1'],
                    propertyOrder: ['a', 'field_1'],
                  },
                },
                required: ['obj'],
                propertyOrder: ['obj'],
              },
              field_2: {
                type: 'string',
                title: '函数类型',
                format: 'codearea',
                placeholder: '请输入函数方法',
                default: 'function func() { console.log("hello, world!"); }',
                description: '用于定义函数方法',
                isRequired: false,
                readOnly: false,
              },
              field_3: {
                type: 'string',
                title: '富文本类型',
                format: 'htmlarea',
                placeholder: '请输入html代码片段',
                default: '<p>hello,world!</p>',
                description: '用于放置html代码片段',
                isRequired: false,
                readOnly: false,
              },
            },
            required: [
              'field_28',
              'field_29',
              'field_30',
              'field_33',
              'field_34',
              'field_2',
              'field_3',
            ],
            propertyOrder: [
              'field_28',
              'field_2',
              'field_3',
              'field_29',
              'field_30',
              'field_34',
              'field_33',
            ],
          },
        },
        required: ['func', 'style', 'data'],
        format: 'object',
        propertyOrder: ['func', 'style', 'data'],
      }, // 用于区块配置的schema  显示  / update  ok
      jsonData1: {
        func: {
          field_1: 'text1',
          field_2: true,
          field_3: '2020-08-08',
          field_4: '2020-08-22 10:57',
          field_5: '00:05:00',
          field_6: 'http://baidu.com',
          field_7: 'hello.world!',
          field_8: 51,
          field_9: 'a',
          field_10: ['a', 'b'],
          field_11: [
            {
              name: 'name',
              field_1: 'lisi',
            },
          ],
          field_12: {
            a: 'text1',
            field_2: 'text2',
            field_3: 'text13',
          },
        },
        style: {
          field_18: '#9c2b2b',
          field_23: {
            unit: 501,
            quantity: 'px',
          },
          field_1: '<p>hello,world!</p>\n<p>hello,world!</p>',
        },
        data: {
          field_28: {
            test: 123,
          },
          field_2: 'function func() {\n  console.log("hello, world!");\n}',
          field_29: {
            data: {
              test: 123,
            },
            filter: '() => {}',
          },
          field_29_2: {
            data: 'http://baidu.com',
            filter: '() => {}',
          },
          field_30: {
            trigger: 'click',
            eventData: {
              test: 123,
            },
          },
          field_30_1: {
            register: 'click',
            actionFunc: '() => {}',
          },
        },
      },
      jsonData: {},
      wideScreen: false,
      jsonView: false,
    };
  }

  render() {
    const { jsonSchema, jsonData, wideScreen, jsonView } = this.state;
    return (
      <>
        <div className="title-container">
          <div className="title1-box">
            <p>
              <b>JSONSchema</b>:
              提供可视化界面编辑json格式/结构；(目前主要用于区块的模型设置，定义区块的配置项)
            </p>
          </div>
          <div className="title2-box">
            <p>
              <b>JSONEditor</b>:
              提供可视化界面编辑json数据内容，用于区块的可视化配置，避免用户直接编辑json数据内容；
              (目前主要用于区块的配置) 。
            </p>
            <div>
              展示模式：
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={wideScreen}
                checkedChildren="宽屏"
                unCheckedChildren="小屏"
                onChange={(checked) => {
                  this.setState({
                    wideScreen: checked,
                  });
                }}
              />
              &nbsp;&nbsp;&nbsp; 是否开启JSONView模式：
              <Switch
                style={{ display: 'inline-block' }}
                defaultChecked={jsonView}
                checkedChildren="开启"
                unCheckedChildren="关闭"
                onChange={(checked) => {
                  this.setState({
                    jsonView: checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="json-action-container">
          <div className="json-schema-box">
            <JSONSchemaEditor
              data={jsonSchema}
              onChange={(newJsonSchema) => {
                console.log('jsonSchemaChange', newJsonSchema);
                this.setState({
                  jsonSchema: newJsonSchema,
                });
              }}
            />
          </div>
          <div className="json-editor-box">
            <JSONEditor
              jsonView={jsonView} // code模式
              wideScreen={wideScreen} // 宽屏和小屏的配置项
              schemaData={jsonSchema}
              jsonData={jsonData}
              onChange={(newJsonData) => {
                console.log('jsonDataChange', JSON.stringify(newJsonData));
                this.setState({
                  jsonData: newJsonData,
                });
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <div>
    <h1>JSON数据可视化/JSONEditor Demo</h1>

    <br />

    <IndexDemo />
  </div>,
  document.getElementById('root'),
);
