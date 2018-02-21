package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Mention;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MentionRepository extends JpaRepository<Mention, Long> {

}
