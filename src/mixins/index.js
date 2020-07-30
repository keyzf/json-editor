import { getWebCacheData, deleteWebCacheData } from '$utils/index';
import { getCurrentFormat } from '$utils/jsonSchema';

/** js对象数据深拷贝，避免数据联动
 * 备注：引用catchJsonDataByWebCache前，请确保当前组件的props中包含以下属性：
 * keyRoute、targetJsonData、updateFormValueData
 * getJSONDataByKeyRoute、getJSONDataTempByKeyRoute
 * */
export function catchJsonDataByWebCache(curKeyRoute) {
  const {
    targetJsonData,
    getJSONDataByKeyRoute,
    getJSONDataTempByKeyRoute,
    updateFormValueData,
  } = this.props;
  const currentFormat = getCurrentFormat(targetJsonData);
  const keyRoute = curKeyRoute || this.props.keyRoute;
  const backUpKeyRoute = getWebCacheData(`${keyRoute}-${currentFormat}`);
  if (backUpKeyRoute) {
    // 1. 先尝试从jsonData中获取数据
    let beckUpJsonData = getJSONDataByKeyRoute(backUpKeyRoute);
    if (!beckUpJsonData) {
      // 2. 再尝试从jsonDataTemp中获取数据
      beckUpJsonData = getJSONDataTempByKeyRoute(backUpKeyRoute);
    }
    if (beckUpJsonData) {
      // 删除前端缓存后立即更新到jsonData中
      deleteWebCacheData(`${keyRoute}-${currentFormat}`);
      updateFormValueData(keyRoute, beckUpJsonData); // 更新数值
    }
  }
}
