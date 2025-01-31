package net.dutymate.api.wardmember.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.dutymate.api.entity.Member;
import net.dutymate.api.entity.WardMember;

@Repository
public interface WardMemberRepository extends JpaRepository<WardMember, Long> {
	Boolean existsByMember(Member member);
}
