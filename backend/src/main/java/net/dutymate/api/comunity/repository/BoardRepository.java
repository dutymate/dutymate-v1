package net.dutymate.api.comunity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.dutymate.api.entity.community.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
