package com.gihojise.newscrab.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class RecoListResponseDto {
//    {
//	"recommend_news" :
//	{
//		"user_base" = List<news_id:int>,
//		"item_base" = List<news_id:int>,
//		"latest" = List<news_id:int>
//	}
//}
    private List<Integer> user_base;
    private List<Integer> item_base;
    private List<Integer> latest;

}
