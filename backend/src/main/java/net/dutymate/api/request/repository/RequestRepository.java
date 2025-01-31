package net.dutymate.api.request.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.dutymate.api.entity.Request;
import net.dutymate.api.entity.WardMember;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

	List<Request> findAllByWardMember(WardMember wardMember);
}
