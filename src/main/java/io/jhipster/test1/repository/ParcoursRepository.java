package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Parcours;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Parcours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParcoursRepository extends JpaRepository<Parcours, Long> {

}
