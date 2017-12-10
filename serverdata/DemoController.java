/**   
 *  
 * Simple to Introduction  
 * @ProjectName:  [PeakeCloud] 
 * @Package:      [com.poobo.demo.controller.DemoController.java]  
 * @ClassName:    [DemoController]   
 * @Description:  [一句话描述该类的功能]   
 * @Author:       [lei.ma]   
 * @CreateDate:   [2016年6月2日 下午4:07:31]   
 * @UpdateUser:   [RayMa]   
 * @UpdateDate:   [2016年6月2日 下午4:07:31]   
 * @UpdateRemark: [说明本次修改内容]  
 * @Version:      [v1.0] 
 *    
 */
package com.poobo.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.poobo.common.ReturnBean;
import com.poobo.common.util.JsonUtils;
import com.poobo.common.util.PageController;
import com.poobo.sysmanage.member.model.TblMember;
import com.poobo.sysmanage.tvshow.service.ITvShowService;

/**
 * @author lei.ma 2016年6月2日 下午4:07:31
 *
 */

@Controller
@RequestMapping("/demo")
public class DemoController {
	
//	@Value("#{configProperties['server_jks_path']}")
//	private static String server_jks_path;
//	@Value("#{configProperties['client_jks_path']}")
//	private static String client_jks_path;
	
	private static Logger log = Logger.getLogger(JsonUtils.class);
	@Autowired
	ITvShowService tvShowService;
	
	
	@RequestMapping("getList")
	@ResponseBody
	public String getList(HttpServletRequest request){
		List<String> list = tvShowService.getList();
		Map<String,List<String>> returnMap = new HashMap<>();
		returnMap.put("date", list);
		return JsonUtils.Obj2JsonString(returnMap);
//		return "{\"date\":[\"2017-12-09\",\"2017-12-08\"]}";
	}
	

	@RequestMapping("getDateRecord")
	@ResponseBody
	public String getDateRecord(HttpServletRequest request,String date){
		Map<String,Object> returnMap = tvShowService.getRecord(date);
	
		return JsonUtils.Obj2JsonString(returnMap);
//		return "{\"date\":[\"2017-12-09\",\"2017-12-08\"]}";
	}
	
	@RequestMapping("getPageList")
	public String toIndex(HttpServletRequest request){
		//TODO 收集参数
		String username=request.getParameter("username");
		request.setAttribute("username", username);
		
        PageController<TblMember> list = new PageController(300, 20, 1);
        List<TblMember> adList =new ArrayList<TblMember>();
        TblMember ad=new TblMember();
        ad.setLoginName("123456");
        adList.add(ad);
        TblMember ad2=new TblMember();
        ad2.setLoginName("11111");
        adList.add(ad2);
        
        
        list.setDataList(adList);
        request.setAttribute("pageList", list);
		return "/manager/demo/list";
	}

	@RequestMapping("toEdit")
	public String toEdit(HttpServletRequest request){
		
		
		
		return "/manager/demo/edit";
	}
	@RequestMapping("edit")
	@ResponseBody
	public String edit(HttpServletRequest request){
		ReturnBean.getFailInstance("", "已经存在");		
		return JsonUtils.Obj2JsonString(ReturnBean.getSuccessInstance(""));
	}
	
	
	/**
	 * 异步校验
	 * @author lei.ma 2016年6月6日 上午9:10:21 
	 * @param request
	 * @return
	 */
	@RequestMapping("remote")
	@ResponseBody
	public boolean remote(HttpServletRequest request){
		
		return true;
	}
	
	
	
	
	
	@RequestMapping("/checkLogin4Json")
	@ResponseBody
	public String checkLogin4Json(){
		return JSONObject.toJSONString(ReturnBean.getSuccessInstance(""));
	}
	
	@RequestMapping("i18n")
    public String languageDemo(HttpServletRequest request){
        return "/manager/demo/i18n";
    }
	
	
}
