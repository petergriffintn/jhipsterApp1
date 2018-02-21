package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Diplome;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Diplome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiplomeRepository extends JpaRepository<Diplome, Long> {

}
