import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import MappingRender from '$components/MappingRender';
import JsonView from '$components/JsonView/index';
import { getCurrentFormat, isFirstSchemaData } from '$utils/jsonSchema';
import { catchJsonDataByWebCache } from '$mixins/index';
import './index.scss';

class ObjectSchema extends React.PureComponent {
  static propTypes = {
    isArrayItem: PropTypes.any, // 如果是数组项，title会进行特殊显示
    arrIndex: PropTypes.any, // 如果是数组项，title会进行特殊显示
    parentType: PropTypes.string,
    jsonKey: PropTypes.string,
    indexRoute: PropTypes.any,
    keyRoute: PropTypes.string,
    nodeKey: PropTypes.string,
    targetJsonData: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      jsonView: false, // 是否显示code模式
    };
  }

  componentWillMount() {
    // 从web缓存中获取数值
    catchJsonDataByWebCache.call(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyRoute !== this.props.keyRoute) {
      /** 当key值路径发生变化时重新从web缓存中获取数值 */
      catchJsonDataByWebCache.call(this, nextProps.keyRoute);
    }
  }

  render() {
    const {
      indexRoute,
      nodeKey,
      keyRoute,
      targetJsonData,
      isArrayItem,
      arrIndex,
    } = this.props;
    const { jsonView } = this.state;
    const curFormat = getCurrentFormat(targetJsonData);
    // 判断是否是一级字段类型，如果是则不显示Title，避免重复的title
    const isFirstSchema = isFirstSchemaData(curFormat);

    return (
      <div
        className="mobile-screen-element-warp element-title-card-warp object-schema-warp"
        key={nodeKey}
        id={nodeKey}
      >
        {!isFirstSchema && !isArrayItem && (
          <div className="element-title">
            <Tooltip title={targetJsonData.description} placement="top">
              <span className="title-text">{targetJsonData.title}</span>
            </Tooltip>
            <span>{isArrayItem ? `/${arrIndex + 1}` : ''}</span>
            <div
              className="display-source-btn"
              onClick={() => {
                this.setState({
                  jsonView: !jsonView,
                });
              }}
            >
              <Tooltip title={jsonView ? '关闭源码模式' : '开启源码模式'}>
                <svg
                  t="1596164081465"
                  className="icon"
                  viewBox="0 0 1025 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1205"
                >
                  <path
                    d="M293.0688 755.2c-12.0832 0-24.2688-4.2496-33.9968-12.9024L0 512l273.4592-243.0976C294.5536 250.2144 326.912 252.0064 345.7024 273.152c18.7904 21.1456 16.896 53.504-4.2496 72.2944L154.112 512l172.9536 153.7024c21.1456 18.7904 23.04 51.1488 4.2496 72.2944C321.2288 749.4144 307.1488 755.2 293.0688 755.2zM751.0528 755.0976 1024.512 512l-259.072-230.2976c-21.1456-18.7904-53.504-16.896-72.2432 4.2496-18.7904 21.1456-16.896 53.504 4.2496 72.2944L870.4 512l-187.3408 166.5024c-21.1456 18.7904-23.04 51.1488-4.2496 72.2944C688.896 762.2144 702.976 768 717.056 768 729.1392 768 741.3248 763.7504 751.0528 755.0976zM511.5392 827.648l102.4-614.4c4.6592-27.904-14.1824-54.272-42.0864-58.9312-28.0064-4.7104-54.3232 14.1824-58.88 42.0864l-102.4 614.4c-4.6592 27.904 14.1824 54.272 42.0864 58.9312C455.5264 870.1952 458.2912 870.4 461.1072 870.4 485.6832 870.4 507.392 852.6336 511.5392 827.648z"
                    p-id="1206"
                    fill={jsonView ? '#1890ff' : 'currentColor'}
                  ></path>
                </svg>
              </Tooltip>
            </div>
          </div>
        )}
        <div
          className={`content-item ${
            !isFirstSchema && !isArrayItem ? 'object-content' : ''
          } ${jsonView ? 'json-view-array' : ''}`}
        >
          {!jsonView &&
            targetJsonData.propertyOrder &&
            targetJsonData.propertyOrder.map((key, index) => {
              /** 1. 获取当前元素的路径值 */
              const currentIndexRoute = `${indexRoute}-${index}`;
              const currentKeyRoute = `${keyRoute}-${key}`; // key路径值，后续用于从jsonData中提取当前元素的数值
              /** 2. 获取当前元素的key值 */
              const currentJsonKey = key;
              /** 3. 获取当前元素的json结构对象 */
              const currentSchemaData =
                targetJsonData.properties[currentJsonKey];
              /** 4. 判断是否是容器类型元素，如果是则禁止选中 */
              const currentFormat = getCurrentFormat(currentSchemaData);
              /** 5. 获取当前元素的id，用于做唯一标识 */
              const childNodeKey = `${nodeKey}-${currentFormat}-${currentJsonKey}`;

              return MappingRender({
                parentType: currentFormat,
                jsonKey: currentJsonKey,
                indexRoute: currentIndexRoute,
                keyRoute: currentKeyRoute,
                nodeKey: childNodeKey,
                targetJsonData: currentSchemaData,
              });
            })}
          {jsonView && <JsonView {...this.props} />}
        </div>
      </div>
    );
  }
}

export default inject((stores) => ({
  pageScreen: stores.JSONSchemaStore.pageScreen,
  getJSONDataByKeyRoute: stores.JSONEditorStore.getJSONDataByKeyRoute,
  updateFormValueData: stores.JSONEditorStore.updateFormValueData,
  getJSONDataTempByKeyRoute: stores.JSONEditorStore.getJSONDataTempByKeyRoute,
}))(observer(ObjectSchema));
