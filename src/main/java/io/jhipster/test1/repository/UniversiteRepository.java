package io.jhipster.test1.repository;

import io.jhipster.test1.domain.Universite;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Universite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UniversiteRepository extends JpaRepository<Universite, Long> {

}
