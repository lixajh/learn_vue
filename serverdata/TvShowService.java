package com.poobo.sysmanage.tvshow.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poobo.frame.service.impl.AbstractBaseService;
import com.poobo.sysmanage.tvshow.mapper.TblTvShowMapper;
import com.poobo.sysmanage.tvshow.model.TblTvShow;
import com.poobo.sysmanage.tvshow.service.ITvShowService;

@Service
@Transactional
public class TvShowService extends AbstractBaseService<TblTvShow, String> implements ITvShowService {

	 @Resource
	    private TblTvShowMapper mapper;
	@Override
	public void setBaseMapper() {
		// TODO Auto-generated method stub
		   super.setBaseMapper(mapper);
	}

	@Override
	public List<String> getList() {
		// TODO Auto-generated method stub
		
		return mapper.getList();
	}

	@Override
	public Map<String, Object> getRecord(String date) {
		// TODO Auto-generated method stub
		return mapper.getRecord(date);
	}}
