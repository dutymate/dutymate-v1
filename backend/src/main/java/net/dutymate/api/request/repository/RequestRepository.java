package net.dutymate.api.request.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.dutymate.api.entity.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

	List<Request> findAllByWardMember_WardMemberId(Long wardMemberId);
}
