package net.dutymate.api.entity.community;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class HotBoard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long hotBoardId;

	@OneToOne(optional = false)
	@JoinColumn(name = "board_id", nullable = false)
	private Board board;

	@Column(nullable = false, updatable = false)
	private Timestamp uploadAtHotBoard;
}
