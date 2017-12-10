package com.poobo.sysmanage.tvshow.service;

import java.util.List;
import java.util.Map;

import com.poobo.frame.service.IBaseService;
import com.poobo.sysmanage.tvshow.model.TblTvShow;

/**
 * @author lix
 *
 */
/**
 * @author lix
 *
 */
public interface ITvShowService extends IBaseService<TblTvShow, String> {

	List<String> getList() ;

	Map<String,Object> getRecord(String date);
}
