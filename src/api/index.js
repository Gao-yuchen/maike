/**
 * 此文件为统一导出接口调用
 */
import { postHttpService, getHttpService, putHttpService, deleteHttpService, } from '../http'

// 添加节点
export const sublistFacilities = (fid, data) => postHttpService('/commission/facilities/nodes/' + fid + '/sublist', data)

// 获取添加节点的type
export const geTypeOfSpecific = (fid) => getHttpService('/commission/facilities/nodes/' + fid + '/meta')

//删除节点
export const deleteFacilites = (fid) => deleteHttpService('/commission/facilities/nodes/' + fid)

//修改 列表
export const buildFacilites = (fid, data) => putHttpService('/commission/facilities/nodes/' + fid, data)

// 获取子节点
export const geSublistOfSpecific = (fid) => getHttpService('/commission/facilities/nodes/' + fid + '/sublist')

// 获取右边表格
export const geSublistRighttable = (fid) => getHttpService('/commission/facilities/nodes/' + fid)

// 获取用户管理右边表格
export const userSublistRighttable = (fid) => getHttpService('/commission/users/nodes/' + fid)

//获取管理员用户信息

export const GetAdministratorUserInformation = (fid) => getHttpService("/commission/users/nodes?userType="+fid)
//获取普通用户信息
export const GetGeneralUserInformation = (fid) => getHttpService("/commission/users/nodes?userType="+fid)

//删除用户信息
export const DeleteAdministratorUserInformation = (fid) => deleteHttpService("/commission/users/nodes/"+fid)

//获取系统设置 

export const GetSystemSettings = () => getHttpService("/commission/system/node/properties")

//修改用户信息

export const changeInformation = (fid,data) => putHttpService("/commission/users/nodes/" + fid,data)

//添加用户信息
export const AddUserInformation = (data) => postHttpService( "/commission/users/nodes",data)

//更新系统设置

export const updateSystem = (data) => putHttpService("/commission/system/node",data)

//登录

export const logincheck = (data) => postHttpService("/commission/login",data)

//获取网关配置

export const gatewayConfiguration = () => getHttpService("/commission/network/nodes/0/sublist")
//获取网关节点
export const gatewaynode = (fid) => getHttpService("/commission/network/nodes/"+fid)

//添加节点
export const addgatewaynode = (data) => postHttpService("/commission/network/nodes/0/sublist",data)

//删除节点
export const removegatewaynode = (fid) => deleteHttpService("/commission/network/nodes/"+fid)

//更新节点
export const amendgatewaynode = (fid,data) => putHttpService("/commission/network/nodes/"+fid,data)


//获取设备组网

export const GetDeviceNetworking = () => getHttpService("/commission/network/nodes/0/subsublist")

//更改节点
export const changeNode = (fid,data) => putHttpService("/commission/network/nodes/"+fid,data)
