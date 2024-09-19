package com.gihojise.newscrab.repository;

import com.gihojise.newscrab.domain.NewsPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsPhotoRepository extends JpaRepository<NewsPhoto, Integer> {

    List<NewsPhoto> findByNews_NewsId(int newsId);
}
