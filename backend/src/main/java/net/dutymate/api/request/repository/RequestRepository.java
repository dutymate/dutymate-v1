package net.dutymate.api.request.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.dutymate.api.entity.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
	
}
